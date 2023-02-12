<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { graphql } from '../gql'
import { ImageInput } from '../gql/graphql'
import { State } from '../types'

const updateDatasetMutation = graphql(`
  mutation updateDataset($identifier: String!, $images: [ImageInput!]!) {
    dataset {
      update(identifier: $identifier, images: $images)
    }
  }
`)

const { commit, state } = useStore<State>()
const text = computed(() =>
  state.status === 'saved' ? 'All up to date!' : 'Save changes'
)

const { executeMutation } = useMutation(updateDatasetMutation)
const save = async () => {
  try {
    await executeMutation({
      identifier: state.dataset.identifier,
      images: state.dataset.images.map(
        (image): ImageInput => ({
          filename: image.filename,
          captions: image.captions || [],
        })
      ),
    })
    commit('setStatus', 'saved')
  } catch (err) {
    commit('setStatus', 'error')
  }
}
</script>

<template>
  <div class="flex items-start">
    <button
      @click="save"
      class="text-lg font-bold p-2 rounded-md cursor-pointer"
      :class="{
        'text-white bg-blue-500 hover:bg-blue-400': state.status === 'unsaved',
        'text-slate-200 bg-slate-800': state.status === 'saved',
      }"
      :disabled="state.status === 'saved'"
    >
      {{ text }}
    </button>
  </div>
</template>
