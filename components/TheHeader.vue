<template>
  <div class="dark:bg-neutral-900">
    <div
      class="container mx-auto px-5 py-10 md:px-18 xl:px-28 hidden md:block"
    >
      <div
        class="flex flex-row justify-start items-center dark:text-white text-gray-900"
      >

        <div class="sidebar"></div>

        <div
          class="flex justify-start gap-3 md:gap-5"
        >
          <div class="">
            <nuxt-link
              to="/dashboard"
              class="nav-link cursor-pointer px-3"
              :class="{ 'active-nav-item': activeRoute === 1 }"
              >Dashboard</nuxt-link
            >
          </div>
          <div class="">
            <nuxt-link
              to="/reports"
              class="nav-link cursor-pointer px-3"
              :class="{ 'active-nav-item': activeRoute === 2 }"
              >Report and Analytics</nuxt-link
            >
          </div>
          <div class="">
            <nuxt-link
              to="/budget"
              class="nav-link cursor-pointer px-3"
              :class="{ 'active-nav-item': activeRoute === 3 }"
              >Set Budget</nuxt-link
            >
          </div>
          <div class="">
            <nuxt-link
              to="/contact"
              class="nav-link cursor-pointer px-3"
              :class="{ 'active-nav-item': activeRoute === 4 }"
              >Contact Us</nuxt-link
            >
          </div>
        </div>

        <div class="flex items-center gap-3 ml-auto">
          <Icon
            name="solar:moon-fog-bold-duotone"
            class="text-gray-900 dark:text-white cursor-pointer"
            size="30"
            v-if="!theme"
            @click="setTheme('dark')"
          />
          <Icon
            name="icon-park-twotone:sun-one"
            class="text-gray-900 dark:text-white cursor-pointer"
            size="30"
            v-else
            @click="setTheme('light')"
          />
          <img
            :src="userData.image"
            alt="Profile Image"
            width="30"
            class="rounded-md"
          />
          <span class="text-gray-900 dark:text-white inter-medium text-sm cursor-pointer ms-5">
            <Icon
            name="solar:logout-bold-duotone"
            class="text-gray-900 dark:text-white cursor-pointer"
            size="30"
          />
            Logout
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#vue-router";
import { useDarkModeStore } from "../store/darkMode";
import { useAuthStore } from "../store/auth";
const route = useRoute();
const activeRoute = ref();

//dark mode store
const darkModeStore = useDarkModeStore();
const { setTheme } = darkModeStore;
const { theme } = storeToRefs(darkModeStore);

const userData: any = useCookie("userData");

watch(route, () => {
  if (route.name === "dashboard") {
    activeRoute.value = 1;
  } else if (route.name === "reports") {
    activeRoute.value = 2;
  } else if (route.name === "budget") {
    activeRoute.value = 3;
  } else if (route.name === "contact") {
    activeRoute.value = 4;
  }
});

onMounted(() => {
  if (route.name === "dashboard") {
    activeRoute.value = 1;
  } else if (route.name === "reports") {
    activeRoute.value = 2;
  } else if (route.name === "budget") {
    activeRoute.value = 3;
  } else if (route.name === "contact") {
    activeRoute.value = 4;
  }
});
</script>

<style lang="css" scoped>
.active-nav-item {
  padding-bottom: 5px;
  color: #e56f8c !important; 
}

.nav-link {
  font-family: 'Inter';
  font-weight: 600;
  color: #545f7c
}

/* Default width */
.sidebar {
  width: 100px;
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .sidebar {
    width: 70px; /* Adjust as needed */
  }
}

@media screen and (min-width: 1201px) and (max-width: 1400px) {
  .sidebar {
    width: 160px; /* Adjust as needed */
  }
}

@media screen and (min-width: 1401px) {
  .sidebar {
    width: 180px; /* For screens larger than 1400px */
  }
}
</style>
