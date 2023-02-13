<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { Ref, ref } from 'vue'
import { useStore } from 'vuex'

import { graphql } from '../gql'
import { Image } from '../gql/graphql'
import { State } from '../types'
import Caption from './Caption.vue'
import CaptionManager from './CaptionManager.vue'
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

const onImageClick = (e: MouseEvent, image: Image) => {
  if (selectedImage.value && e.ctrlKey) {
    const captionsToAdd =
      image.captions?.filter(
        (caption) => !selectedImage.value?.captions?.find((c) => c === caption)
      ) || []

    selectedImage.value = {
      ...selectedImage.value,
      captions: selectedImage.value?.captions
        ? selectedImage.value?.captions.concat(captionsToAdd)
        : captionsToAdd,
    }

    commit('updateImageCaptions', selectedImage.value)
    return
  }

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
</script>

<template>
  <div class="flex flex-1 flex-col xl:flex-row gap-5">
    <div class="flex-1">
      <div class="flex gap-5" v-if="!!selectedImage">
        <div>
          <h2 class="text-xl mb-2">Image Preview</h2>
          <ImagePreview :image="selectedImage" />
        </div>

        <div class="flex-1">
          <CaptionManager
            :selectedImage="selectedImage"
            :modelValue="captionInputValue"
            :addCaption="addCaption"
            :removeCaption="removeCaption"
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
