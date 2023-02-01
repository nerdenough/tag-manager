<script setup lang="ts">
interface Option {
  key: string
  value: string
}

interface Props {
  label: string
  options: Array<Option>
  onChange: (event: Event) => void
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
})
</script>

<template>
  <label>
    <h4 class="text-xl mb-1">{{ props.label }}:</h4>
    <select
      @change="onChange"
      class="p-2 text-xl bg-slate-800 border-2 border-slate-700 focus:border-blue-500 hover:border-slate-600 rounded-md w-64 mb-5"
    >
      <option disabled selected value></option>
      <option v-for="option in props.options" :value="option.value">
        {{ option.key }}
      </option>
    </select>
  </label>
</template>
