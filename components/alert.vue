<template>
  <!-- Main modal -->
  <transition name="modal">
    <div
      v-if="isVisible"
      class="modal flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="modal-container relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white ml-auto"
            >
              {{ title }}
            </h3>
            <button
              type="button"
              @click="isVisible = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4 text-center">
            <Icon
              name="clarity:success-standard-line"
              color="green"
              size="70"
              v-if="type === 'success'"
            />
            <Icon
              name="bx:error"
              color="red"
              size="70"
              v-if="type === 'error'"
            />
            <Icon
              name="lucide:info"
              color="black"
              size="70"
              v-if="type === 'info'"
            />
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {{ desc }}
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <nuxt-link
              :to="link"
              data-modal-hide="default-modal"
              type="button"
              class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >{{ button }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </transition>

  <div class="modal-overlay" v-if="isVisible"></div>
</template>

<script setup lang="ts">
import { useExpenseStore } from "~/store/expense";
const expenseStore = useExpenseStore();
const { allExpenses } = storeToRefs(expenseStore);
const isVisible = ref(false);

const props = defineProps({
  title: String,
  desc: String,
  link: String,
  button: String,
  type: String,
});

onMounted(() => {
  if (allExpenses.value.length > 0) {
    isVisible.value = false;
  } else {
    isVisible.value = true;
  }
});
</script>

<style lang="css" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  z-index: 9998;
  transition: opacity 0.3s ease;
}

.modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
