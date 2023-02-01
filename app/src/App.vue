<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { computed, ref } from 'vue'

import Header from './components/Header.vue'
import Select from './components/Select.vue'
import Dataset from './components/Dataset.vue'
import { graphql } from './gql'

const { data } = useQuery({
  query: graphql(`
    query getDataset {
      dataset {
        getIdentifiers
      }
    }
  `),
})

const datasetIdentifiers = computed(
  () => data.value?.dataset?.getIdentifiers || []
)

let selectedDatasetIdentifier = ref('')

const onDatasetChange = (event: Event) => {
  selectedDatasetIdentifier.value = (event.target as HTMLSelectElement).value
}
</script>

<template>
  <Header />
  <main class="flex flex-col p-5">
    <Select
      :onChange="onDatasetChange"
      label="Dataset"
      :options="
        datasetIdentifiers.map((identifier) => ({
          key: identifier,
          value: identifier,
        }))
      "
    />
    <Dataset
      v-if="!!selectedDatasetIdentifier"
      :identifier="selectedDatasetIdentifier"
    />
  </main>
</template>
