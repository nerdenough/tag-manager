<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { graphql } from '../gql'
import { State } from '../types'
import SaveButton from './SaveButton.vue'
import Select from './Select.vue'

const { commit, state } = useStore<State>()

const { data } = useQuery({
  query: graphql(`
    query getDatasetIdentifiers {
      dataset {
        getIdentifiers
      }
    }
  `),
})

const datasetIdentifiers = computed(
  () => data.value?.dataset?.getIdentifiers || []
)

const onDatasetChange = async (e: Event) => {
  const identifier = (e.target as HTMLSelectElement).value
  commit('setDataset', {
    identifier,
    images: [],
  })
}
</script>

<template>
  <header class="flex items-center bg-slate-800 gap-x-4 p-5">
    <h1 class="text-2xl">Tag Manager</h1>
    <Select
      placeholder="Choose a dataset"
      :onChange="onDatasetChange"
      :options="
        datasetIdentifiers.map((identifier) => ({
          key: identifier,
          value: identifier,
        }))
      "
    />
    <div class="flex-1" />
    <SaveButton v-if="state.dataset.identifier" />
  </header>
</template>
