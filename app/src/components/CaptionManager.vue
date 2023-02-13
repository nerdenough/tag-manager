<script setup lang="ts">
import Caption from './Caption.vue'
import { Image } from '../gql/graphql'

type Props = {
  selectedImage: Image
  modelValue: string
  addCaption: (caption: string) => void
  removeCaption: (caption: string) => void
}

const { addCaption, selectedImage } = defineProps<Props>()

const onAddCaptionFieldKeyUp = (event: KeyboardEvent) => {
  if (event.code !== 'Comma' && event.code !== 'Enter') {
    return
  }

  let caption = (event.target as HTMLInputElement).value
  if (!caption || !selectedImage.filename) {
    return
  }

  caption = event.code === 'Comma' ? caption.slice(0, -1) : caption
  addCaption(caption.trim())
}
</script>

<template>
  <div>
    <h2 class="text-xl mb-2">Captions</h2>
    <div class="flex mb-5">
      <input
        @keyup="onAddCaptionFieldKeyUp"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        type="text"
        class="flex-1 p-2 text-xl bg-slate-700 border-2 border-r-0 border-slate-700 focus:border-blue-500 hover:border-slate-600 rounded-tl-md rounded-bl-md w-64 outline-none"
        placeholder="Write a descriptive tag"
      />
      <button
        @click="() => addCaption(modelValue)"
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
</template>
