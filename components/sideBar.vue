<template>
  <aside
    class="h-screen fixed top-0 left-0 bottom-0 bg-gray-900 dark:bg-neutral-900 sidebar hidden md:block overflow-hidden"
    @mouseenter="toggleVisibility(true)"
    @mouseleave="toggleVisibility(false)"
    :class="{ 'sidebar-active': isVisible }"
  >
    <div class="flex flex-col justify-center gap-8 flex-nowrap items-start">
      <div class="">
        <img
          src="/logo.svg"
          alt="Expense Tracker Logo"
          width="240"
          v-if="isVisible"
        />
        <img
          src="/logo-icon.svg"
          alt="Expense Tracker Logo"
          width="90"
          v-else
        />
      </div>

      <div class="flex items-center justify-center flex-nowrap">
        <nuxt-link
          to=""
          class="text-white dark:text-white font-medium cursor-pointer"
        >
          <Icon
            name="ic:baseline-dashboard"
            size="24"
            class="text-white dark:text-white me-2"
          />
        </nuxt-link>

        <nuxt-link
          to=""
          class="text-white cursor-pointer menu-title"
          :class="{ 'menu-active': isVisible }"
          >Dashboard</nuxt-link
        >
      </div>

      <div class="flex items-center justify-center flex-nowrap">
        <nuxt-link
          to=""
          class="text-white dark:text-white font-medium cursor-pointer"
        >
          <Icon
            name="bxs:report"
            size="24"
            class="text-white dark:text-white me-2"
          />
        </nuxt-link>
        <nuxt-link
          to="/reports"
          class="text-white cursor-pointer menu-title"
          :class="{ 'menu-active': isVisible }"
          >Reports</nuxt-link
        >
      </div>

      <div class="flex items-center justify-center flex-nowrap">
        <nuxt-link
          to=""
          class="text-white dark:text-white font-medium cursor-pointer"
        >
          <Icon
            name="solar:money-bag-bold"
            size="24"
            class="text-white dark:text-white me-2"
          />
        </nuxt-link>
        <nuxt-link
          to="/budget"
          class="text-white cursor-pointer menu-title"
          :class="{ 'menu-active': isVisible }"
          >Budget</nuxt-link
        >
      </div>

      <div class="flex items-center justify-center flex-nowrap">
        <nuxt-link
          to=""
          class="text-white dark:text-white font-medium cursor-pointer"
        >
          <Icon
            name="teenyicons:contact-solid"
            size="24"
            class="text-white dark:text-white me-2"
          />
        </nuxt-link>
        <nuxt-link
          to="/profile"
          class="text-white cursor-pointer menu-title"
          :class="{ 'menu-active': isVisible }"
          >Profile</nuxt-link
        >
      </div>

      <div class="flex items-center justify-center flex-nowrap">
        <nuxt-link
          to=""
          class="text-white dark:text-white font-medium cursor-pointer"
        >
          <Icon
            name="fa6-solid:envelope"
            size="24"
            class="text-white dark:text-white me-2"
          />
        </nuxt-link>
        <nuxt-link
          to="/contact"
          class="text-white cursor-pointer menu-title"
          :class="{ 'menu-active': isVisible }"
          >Contact</nuxt-link
        >
      </div>

      <div class="flex items-center justify-center flex-nowrap">
        <Icon name="carbon:logout" class="text-white cursor-pointer" size="24" @click="logout()"/>
        <span
          @click="logout()"
          class="text-white cursor-pointer menu-title"
          :class="{ 'menu-active': isVisible }"
          >Logout</span
        >
      </div>
    </div>
  </aside>
</template>

<script setup>
const isVisible = ref(false);
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const {logUserOut} = authStore;

const router = useRouter()

const toggleVisibility = (param) => {
  isVisible.value = param;
};


const logout = () =>{
  logUserOut();
  router.push({path:'/'})
}
</script>

<style lang="css" scoped>
.text-red {
  color: red;
}

.sidebar {
  border-right: 1px solid #1f212a;
  padding:40px 20px;
  width: 80px;
  transition: width 1s ease-in-out;
}

.sidebar-active {
  width: 265px;
}

.menu-title {
  opacity: 0;
  transition: opacity 1s ease-in-out;
  margin-left: 5px;
}

.menu-active {
  opacity: 1;
}
</style>
