<script setup lang="ts">
import { useStore } from 'vuex'

import Header from './components/Header.vue'
import Dataset from './components/Dataset.vue'

import { State } from './types'

const { state } = useStore<State>()
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="flex flex-1 flex-col p-5">
      <Suspense>
        <Dataset
          v-if="!!state.dataset.identifier"
          :identifier="state.dataset.identifier"
        />
      </Suspense>
    </main>
  </div>
</template>
