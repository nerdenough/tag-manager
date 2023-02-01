import { createApp } from 'vue'
import urql from '@urql/vue'

import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(urql, {
  url: 'http://localhost:4000/graphql',
})

app.mount('#app')
