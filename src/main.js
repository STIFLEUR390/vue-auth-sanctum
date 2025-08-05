import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useRouter } from 'vue-router'

import './assets/styles.scss'
import 'bootstrap'
import Vue3Toastify from 'vue3-toastify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import SecureLS from 'secure-ls'
const ls = new SecureLS()
import { useUserStore } from '@/stores/userStore'
const route = useRouter()
// axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_API_TOKEN}`

const pinia = createPinia()
const persistedStatePlugin = createPersistedStatePlugin({
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
})
pinia.use(persistedStatePlugin)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

const userStore = useUserStore()
axios.interceptors.request.use(
  function (config) {
    config.baseURL = import.meta.env.VITE_BASE_URL

    if (userStore.isAuthenticated) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userStore.accessToken}`,
      }
    } else {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    }
    return config
  },
  function (error) {
    // faire quelque chose en cas d’erreur
    return Promise.reject(error)
  },
)

// ajout d’un intercepteur de réponse
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      userStore.logout()
      route.push({ name: 'login' })
    }
    return Promise.reject(error)
  },
)

app.use(Vue3Toastify, {
  autoClose: 3000,
})
app.use(VueAxios, axios)

app.mount('#app')
