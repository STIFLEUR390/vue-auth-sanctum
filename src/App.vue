<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { toast } from 'vue3-toastify'
const userStore = useUserStore()
import { useRouter } from 'vue-router'

const isPending = ref(false)
const router = useRouter()

async function logoutCurrentUser() {
  isPending.value = true

  try {
    await axios.post('/api/v1/auth/logout')
    userStore.logout()
    toast.success('Déconnexion réussie')
    router.push({ name: 'login' })
  } catch (error) {
    if (error.response.status === 401) {
      toast.success('Déconnexion réussie')
    } else {
      toast.error('Une erreur est survenue')
    }
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">EKey Market</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Profile</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/adresses"
              >Adresses</RouterLink
            >
          </li>
        </ul>
        <div class="d-flex">
          <div v-if="userStore.isAuthenticated" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ userStore.user.name }} ({{ userStore.user.email }})
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logoutCurrentUser">
                  <span v-if="isPending">Déconnexion...</span>
                  <span v-else>Déconnexion</span>
                </a>
              </li>
            </ul>
          </div>
          <RouterLink v-else class="btn btn-info" to="/auth/login"> Connexion </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style scoped></style>
