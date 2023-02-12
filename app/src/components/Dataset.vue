<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useStore } from 'vuex'

import { graphql } from '../gql'
import { Image } from '../gql/graphql'
import { State } from '../types'

interface Props {
  identifier: string
}

const props = defineProps<Props>()
const store = useStore<State>()

const setInitialState = async () => {
  const { data } = await useQuery({
    query: graphql(`
      query getDatasetImages($identifier: String!) {
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
    `),
    variables: {
      identifier: props.identifier,
    },
  })

  const images = data.value?.dataset.get?.images
  if (images?.length) {
    store.commit('setImages', images)
  }
}

setInitialState()

const images: ComputedRef<Image[]> = computed(() => store.state.images)

const selectedImage: Ref<Image | null> = ref(null)
let captionInputValue: string = ''

const onImageClick = (image: Image) => {
  selectedImage.value = image
}

const addCaption = (caption: string) => {
  const image = selectedImage.value
  if (!image || image.captions?.find((str) => str === caption)) {
    return
  }

  image.captions = image.captions ? image.captions.concat(caption) : [caption]
  store.commit('updateImageCaptions', image)
  captionInputValue = ''
}

const removeCaption = (caption: string) => {
  const image = selectedImage.value
  if (!image?.captions) {
    return
  }
  image.captions = image?.captions.filter((str) => str !== caption)
  store.commit('updateImageCaptions', image)
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
          v-for="image in images"
          class="flex flex-col cursor-pointer border-2 rounded-md items-center justify-center"
          :class="{
            'border-slate-700 hover:border-slate-600':
              selectedImage?.filename !== image.filename,
            'border-blue-500': selectedImage?.filename === image.filename,
          }"
          @click="() => onImageClick(image)"
        >
          <img
            class="max-w-full mb-2 p-2"
            :src="image.url"
            :alt="image.filename"
          />
          <p
            class="w-full text-center"
            :class="{
              'bg-blue-500': selectedImage?.filename === image.filename,
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
          <button class="bg-blue-500 text-xl p-2 rounded-tr-md rounded-br-md">
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="caption in selectedImage.captions"
            class="flex gap-x-2 bg-slate-800 text-lg p-2 rounded-md"
          >
            <span class="flex-1">{{ caption }}</span>
            <div class="flex items-center">
              <button
                @click="() => removeCaption(caption)"
                class="w-8 h-8 bg-slate-900 hover:bg-slate-700 text-slate-400 hover:text-red-300 rounded-md"
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
