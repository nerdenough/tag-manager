<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { graphql } from '../gql'
import { Image } from '../gql/graphql'

interface Props {
  identifier: string
}

const props = defineProps<Props>()

const { data } = useQuery({
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

const images: ComputedRef<Image[] | null | undefined> = computed(
  () => data.value?.dataset.get?.images
)

const selectedImage: Ref<Image | null> = ref(null)

const onImageClick = (image: Image) => {
  selectedImage.value = image
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
            type="text"
            class="flex-1 p-2 text-xl bg-slate-800 border-2 border-r-0 border-slate-700 focus:border-blue-500 hover:border-slate-600 rounded-tl-md rounded-bl-md w-64 outline-none"
            placeholder="Write a descriptive tag"
          />
          <button class="bg-blue-500 text-xl p-2 rounded-tr-md rounded-br-md">
            Add
          </button>
        </div>
        <div class="flex gap-2">
          <div
            v-for="caption in selectedImage.captions"
            class="bg-slate-800 text-lg p-2 rounded-md"
          >
            {{ caption }}
            <button>x</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
