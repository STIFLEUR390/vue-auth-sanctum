<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const email = ref('loic@gmail.com')
const password = ref('123456789')
const pending = ref(false)
const errors = ref([])

async function loginUser() {
  pending.value = true
  errors.value = []

  try {
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('password', password.value)
    const response = await axios.post('/api/v1/auth/login', formData)

    toast.success('Connexion réussie')
    userStore.authUser(response.data.data)
    router.push({ name: 'home' })
  } catch (error) {
    if (error.response.status === 422) {
      const errors = error.response.data.errors
      toast.error(errors[0].detail)
      errors.value = errors
    } else {
      toast.error('Une erreur est survenue')
    }
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="card mt-4">
    <div class="card-header">
      <h1 class="cart-title">Connexion</h1>
    </div>
    <div class="card-body">
      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="password" />
        </div>
        <button type="submit" :disabled="pending" class="btn btn-primary">
          <span v-if="pending">Connexion...</span>
          <span v-else>Connexion</span>
        </button>
      </form>
    </div>
  </div>
</template>
