<script setup lang="ts">
import { Image } from '../gql/graphql'

type Props = {
  image: Image
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <div class="flex flex-col gap-y-4 bg-slate-800 rounded-md p-4">
      <span class="font-bold"
        >{{ image.filename }}<span v-if="image.captions?.length"></span
      ></span>
      <img
        class="h-96 border-2 border-blue-500 rounded-md"
        :src="image.url"
        :alt="image.filename"
      />
      <caption class="w-96">
        {{
          image.captions?.join(', ')
        }}
      </caption>
    </div>
  </div>
</template>
