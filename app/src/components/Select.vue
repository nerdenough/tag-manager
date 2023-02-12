<script setup lang="ts">
interface Option {
  key: string
  value: string
}

type Props = {
  placeholder?: string
  options: Array<Option>
  onChange: (event: Event) => void
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
})
</script>

<template>
  <select
    @change="onChange"
    class="p-2 text-xl bg-slate-900 border-2 border-slate-700 focus:border-blue-500 hover:border-slate-600 rounded-md w-64"
  >
    <option disabled selected value>{{ placeholder }}</option>
    <option v-for="option in props.options" :value="option.value">
      {{ option.key }}
    </option>
  </select>
</template>
