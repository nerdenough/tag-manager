import { createApp } from 'vue'
import { createStore } from 'vuex'
import urql from '@urql/vue'

import App from './App.vue'
import { State } from './types'
import { Image } from './gql/graphql'

import './style.css'

const store = createStore({
  state(): State {
    return {
      status: 'saved',
      dataset: {
        identifier: '',
        images: [],
      },
    }
  },
  mutations: {
    setDataset(
      state,
      dataset: {
        identifier: string
        images: Image[]
      }
    ) {
      state.dataset = dataset
    },
    setStatus(state, status) {
      state.status = status
    },
    updateImageCaptions(state, { filename, captions }: Image) {
      state.status = 'unsaved'
      state.dataset.images = state.dataset.images.map((image) => {
        if (image.filename !== filename) {
          return image
        }
        return {
          ...image,
          captions,
        }
      })
    },
  },
})

const app = createApp(App)

app.use(store)
app.use(urql, {
  url: 'http://localhost:4000/graphql',
})

app.mount('#app')
