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
      images: [],
    }
  },
  mutations: {
    setImages(state, images: Image[]) {
      state.images = images
    },
    updateImageCaptions(state, { filename, captions }: Image) {
      state.images = state.images.map((image) => {
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
