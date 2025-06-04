import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import DraggableResizableVue from 'draggable-resizable-vue3'

import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
  })

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(vuetify)
app.use(DraggableResizableVue)

app.config.globalProperties.$axios = axios; 
app.mount('#app')