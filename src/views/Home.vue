<script setup>
import { ref } from 'vue'
import axios from 'axios'
const user = ref({})

async function getUser() {
  const response = await axios.get('/api/v1/auth/profile')
  user.value = response.data.data
}
getUser()
</script>

<template>
  <div class="card mt-4">
    <div class="card-header">
      <h5 class="card-title">Profile</h5>
    </div>
    <div class="card-body"></div>
  </div>
</template>
