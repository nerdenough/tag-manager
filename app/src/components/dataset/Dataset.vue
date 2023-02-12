<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { Ref, ref } from 'vue'
import { useStore } from 'vuex'
import { graphql } from '../../gql'

import { Image } from '../../gql/graphql'
import { State } from '../../types'
import Caption from './Caption.vue'
import ImageGrid from './ImageGrid.vue'
import ImagePreview from './ImagePreview.vue'

type Props = {
  identifier: string
}

defineProps<Props>()

const { commit, state } = useStore<State>()

const getDatasetQuery = graphql(`
  query getDataset($identifier: String!) {
    dataset {
      get(identifier: $identifier) {
        images {
          filename
          url
          captions
        }
      }
    }
  }
`)

const { data } = await useQuery({
  query: getDatasetQuery,
  variables: {
    identifier: state.dataset.identifier,
  },
})

const images = data.value?.dataset.get?.images
if (images?.length) {
  commit('setDataset', {
    ...state.dataset,
    images,
  })
}

const selectedImage: Ref<Image | undefined> = ref(images?.[0])
let captionInputValue: string = ''

const onImageClick = (image: Image) => {
  selectedImage.value = image
}

const addCaption = (caption: string) => {
  const image = selectedImage.value
  if (!caption || !image || image.captions?.find((str) => str === caption)) {
    return
  }

  image.captions = image.captions ? image.captions.concat(caption) : [caption]
  commit('updateImageCaptions', image)
  captionInputValue = ''
}

const removeCaption = (caption: string) => {
  const image = selectedImage.value
  if (!image?.captions) {
    return
  }
  image.captions = image?.captions.filter((str) => str !== caption)
  commit('updateImageCaptions', image)
}

const onAddCaptionFieldKeyUp = (event: KeyboardEvent) => {
  if (event.code !== 'Comma' && event.code !== 'Enter') {
    return
  }

  let caption = (event.target as HTMLInputElement).value
  if (!caption || !selectedImage.value?.filename) {
    return
  }

  caption = event.code === 'Comma' ? caption.slice(0, -1) : caption
  addCaption(caption.trim())
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-5">
    <div class="flex gap-5">
      <ImagePreview v-if="!!selectedImage" :image="selectedImage" />
      <div v-if="!!selectedImage">
        <h2 class="text-xl">Captions</h2>
        <h3 class="text-lg mb-2">
          <span class="text-slate-500">{{ selectedImage.filename }}</span>
        </h3>
        <div class="flex mb-5">
          <input
            @keyup="onAddCaptionFieldKeyUp"
            v-model="captionInputValue"
            type="text"
            class="flex-1 p-2 text-xl bg-slate-800 border-2 border-r-0 border-slate-700 focus:border-blue-500 hover:border-slate-600 rounded-tl-md rounded-bl-md w-64 outline-none"
            placeholder="Write a descriptive tag"
          />
          <button
            @click="() => addCaption(captionInputValue)"
            class="bg-blue-500 text-xl p-2 rounded-tr-md rounded-br-md"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <Caption
            v-for="caption in selectedImage.captions"
            :caption="caption"
            :remove="removeCaption"
          />
        </div>
      </div>
    </div>

    <ImageGrid
      :images="state.dataset.images"
      :selectedImage="selectedImage"
      :onImageClick="onImageClick"
    />
  </div>
</template>
