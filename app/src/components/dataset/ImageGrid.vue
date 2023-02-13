<script setup lang="ts">
import { Image } from '../../gql/graphql'

type Props = {
  images: Image[]
  selectedImage?: Image
  onImageClick: (e: MouseEvent, image: Image) => void
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col rounded-md overflow-x-scroll">
    <div class="flex min-h-min w-48 gap-x-2 rounded-md">
      <div
        v-for="image in images"
        class="tm-ig-image min-w-full bg-slate-900 flex flex-col cursor-pointer border-2 rounded-md overflow-hidden items-center justify-center"
        :class="{
          'border-slate-800 hover:border-slate-600':
            selectedImage?.filename !== image.filename,
          'border-blue-500': selectedImage?.filename === image.filename,
        }"
        @click="(e) => onImageClick(e, image)"
      >
        <img class="max-w-48 max-h-48" :src="image.url" :alt="image.filename" />
        <span
          class="w-full font-bold text-center py-2"
          :class="{
            'bg-slate-700 text-slate-400':
              selectedImage?.filename !== image.filename,
            'bg-blue-500 text-white':
              selectedImage?.filename === image.filename,
          }"
        >
          {{ image.filename }}
        </span>
      </div>
    </div>
  </div>
</template>
