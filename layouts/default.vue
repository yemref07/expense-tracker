<template>
  <div :class="{ 'dark': theme }">
    <div class="dark:bg-neutral-900 bg-milk">
      <TheHeader />
      <SideBar />
      <slot />
      <TheFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDarkModeStore } from "~/store/darkMode";
const store = useDarkModeStore();
const { theme } = storeToRefs(store);
</script>

<style scoped></style>
