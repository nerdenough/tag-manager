<script setup lang="ts">
import { Image } from '../../gql/graphql'

type Props = {
  image: Image
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center gap-y-4">
    <img class="h-96" :src="image.url" :alt="image.filename" />
    <caption class="w-96">
      <span class="font-bold"
        >{{ image.filename }}<span v-if="image.captions?.length">:</span></span
      >
      {{
        image.captions?.join(', ')
      }}
    </caption>
  </div>
</template>
