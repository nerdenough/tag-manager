<script setup lang="ts">
type Props = {
  caption: string
  remove: (caption: string) => void
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-x-2 bg-slate-800 text-lg p-2 rounded-md">
    <span class="flex-1">{{ caption }}</span>
    <div class="flex items-center">
      <button
        @click="() => remove(caption)"
        class="w-8 h-8 bg-slate-900 hover:bg-slate-700 text-slate-400 hover:text-red-300 rounded-md"
      >
        x
      </button>
    </div>
  </div>
</template>
