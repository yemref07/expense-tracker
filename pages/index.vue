<template>
  <div class="px-5 md:px-0 dark:bg-gray-900">
    <div class="grid md:grid-cols-2">
      <div
        class="flex flex-col justify-evenly md:justify-around gap-5 flex-nowrap h-screen"
      >
        <div class="w-full">
          <img
            src="/logo.svg"
            alt="Expense Tracker Logo"
            class="mx-auto mb-5"
            width="300"
          />
          <p class="text-center text-lg text-gray-900 dark:text-white">
            Not a Member yet?
            <nuxt-link
              to="/"
              title="Sign Up"
              class="cursor-pointer ms-1 text-sky-400 font-medium"
              >Sign Up</nuxt-link
            >
          </p>
        </div>

        <div
          class="flex w-full flex-col justify-center items-center gap-5 flex-nowrap"
        >
          <div class="w-full text-center">
            <h1
              class="font-semibold text-2xl mb-2 text-gray-900 dark:text-white"
            >
              Sign In
            </h1>
            <p class="text-sm md:text-base text-gray-900 dark:text-white">
              Get unlimited access & manage your money
            </p>
          </div>

          <div class="w-full md:w-3/4 lg:w-1/2">
            <label
              for="first_name"
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >Username</label
            >
            <input
              v-model="formData.id"
              type="text"
              placeholder="Username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="w-full md:w-3/4 lg:w-1/2">
            <label
              for="first_name"
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              v-model="formData.password"
              type="password"
              maxlength="6"
              placeholder="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div
            class="flex justify-between items-center w-full md:w-3/4 lg:w-1/2"
          >
            <button
              type="button"
              @click="login()"
              class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 delay-75 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none d ark:focus:ring-blue-800"
            >
              Sign In
            </button>

            <span class="dark:text-white text-gray-900">Or</span>

            <div class="flex flex-nowrap gap-3">
              <Icon
                name="uil:apple"
                size="22"
                class="cursor-pointer text-gray-900 dark:text-white"
              />
              <Icon
                name="uil:facebook"
                size="22"
                class="cursor-pointer text-gray-900 dark:text-white"
              />
              <Icon
                name="uil:google"
                size="22"
                class="cursor-pointer text-gray-900 dark:text-white"
              />
              <Icon
                name="uil:twitter"
                size="22"
                class="cursor-pointer text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div
            class="flex justify-between items-center w-full md:w-3/4 lg:w-1/2 mt-5 md:mt-12"
          >
            <div
              class="flex items-center cursor-pointer relative py-6"
              @mouseenter="isVisible = true"
              @mouseleave="isVisible = false"
            >
              <div class="flex items-center cursor-pointer gap-2">
                <img
                  src="/images/flags/uk.svg"
                  alt=""
                  width="25"
                  class="rounded-full"
                />
                <span class="text-gray-900 dark:text-white font-medium"
                  >English</span
                >
                <Icon
                  name="formkit:down"
                  size="24"
                  class="cursor-pointer text-gray-900 dark:text-white"
                />
              </div>

              <div
                class="select-menu"
                :class="{ 'select-menu-active': isVisible }"
              >
                <div class="flex gap-2">
                  <img
                    src="/images/flags/tr.svg"
                    alt=""
                    width="25"
                    class="rounded-sm"
                  />
                  <span class="text-gray-900 dark:text-white font-medium"
                    >Turkish</span
                  >
                </div>
              </div>
            </div>

            <nuxt-link
              to=""
              class="cursor-pointer ms-1 text-sky-400 font-medium"
              >Forget Password?</nuxt-link
            >
          </div>
        </div>
      </div>

      <div class="login-bg hidden md:block"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '../store/auth'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
definePageMeta({
  layout: false
})


const router = useRouter()

const isVisible = ref(false);
const formData = reactive({
  id: "kminchelle",
  password: "0lelplR",
});


const authStore = useAuthStore()
const {loginUser} = authStore;
const {isAuthenticated} = storeToRefs(authStore)

const login = async () => {
 await loginUser(formData);
  if(isAuthenticated){
    router.push({path:'/dashboard'})
  }

}

</script>

<style scoped>
.login-bg {
  background: url(/images/bg-images/sign-bg.png);
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: center;
}

.select-menu {
  position: absolute;
  opacity: 0;
  pointer-events: none; /* Initially not clickable */
  transition: opacity 0.5s ease; /* Smooth opacity change */
}

.select-menu-active {
  opacity: 1;
  pointer-events: auto; /* Enable pointer events when visible */
  animation: slideIn 0.3s forwards; /* Use an additional animation */
}

@keyframes slideIn {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-150%);
  }
}
</style>
