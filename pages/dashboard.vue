<template>
  <div>Dasboard page</div>
  <button @click="logout">logout</button>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import { useRouter } from '#vue-router';
const router = useRouter()

const authStore = useAuthStore()

const {logUserOut} = authStore
const logout = ()=>{
    logUserOut()
    router.push('/');
}

</script>

<style lang="scss" scoped>

</style>
