import { useAuthStore } from "~/store/auth"
import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from) => {
  // Implement authentication logic
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  const token = useCookie('token')

  if (token.value) {
    isAuthenticated.value = true;
  }
  // if token exists and url is '/ 'redirect to dashboard
  if (token.value && to.path === '/') {
    return navigateTo('/dashboard')
  }
  if (!token.value && to.path !== '/') {
    abortNavigation()
    return navigateTo('/')
  }

})