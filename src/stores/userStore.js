import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {},
    accessToken: '',
    refreshToken: '',
  }),
  getters: {
    isAuthenticated: (state) => state.accessToken !== '',
  },
  actions: {
    authUser(data) {
      this.user = data.user
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token
    },
    logout() {
      this.user = {}
      this.accessToken = ''
      this.refreshToken = ''
    },
  },
})
