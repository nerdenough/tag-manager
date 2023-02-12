<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { Ref, ref } from 'vue'
import { useStore } from 'vuex'
import { graphql } from '../gql'

import { Image } from '../gql/graphql'
import { State } from '../types'
import Caption from './dataset/Caption.vue'

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

const selectedImage: Ref<Image | null> = ref(images?.[0] || null)
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
  <div class="flex gap-x-5">
    <div class="flex flex-1 flex-col">
      <h2 class="text-xl mb-2">Images</h2>
      <div class="grid gap-2 grid-cols-4 rounded-md">
        <div
          v-for="image in state.dataset.images"
          class="flex flex-col cursor-pointer border-2 rounded-md items-center justify-center"
          :class="{
            'border-slate-800 hover:border-slate-600':
              selectedImage?.filename !== image.filename,
            'border-blue-500': selectedImage?.filename === image.filename,
          }"
          @click="() => onImageClick(image)"
        >
          <img class="max-w-full" :src="image.url" :alt="image.filename" />
          <p
            class="w-full font-bold text-center py-2"
            :class="{
              'bg-slate-800 text-slate-400':
                selectedImage?.filename !== image.filename,
              'bg-blue-500 text-white':
                selectedImage?.filename === image.filename,
            }"
          >
            {{ image.filename }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex-1">
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
  </div>
</template>
