<template>
  <container class="mt-10">
    <div class="grid md:grid-cols-3 gap-10">
      <div class="col-span-1">
        <div class="mb-10 shadow-md p-10">
          <h2
            class="font-semibold mb-4 text-xl dark:text-white flex items-center"
          >
            <icon name="ion:add" size="36"></icon>
            Add Your Budgets
          </h2>
          <label
            for="budget"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Budget</label
          >

          <input
            v-focus
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Set Your Budget"
            required
          />

          <input
            min="2024-01"
            max="2024-12"
            type="month"
            class="bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Budget Date"
            required
          />

          <btn-orange class="mt-5" @click="addBud()">Set Budget</btn-orange>
        </div>

        <div class="shadow-md p-10 mb-5">
          <div class="mb-5">
            <h2
              class="font-semibold mb-4 text-xl dark:text-white flex items-center"
            >
              <icon name="ion:add" size="36"></icon>
              Add Your Expense
            </h2>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Expense Category</label
            >
            <select
              v-model="expenseData.category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected class="">Choose a Category</option>
              <option
                v-for="(item, index) in categories"
                :key="index"
                :value="item"
                class="uppercase"
              >
                {{ item }}
              </option>
            </select>
          </div>

          <div class="mb-5">
            <label
              for="amout"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Expense Amount</label
            >
            <input
              type="number"
              min="0"
              v-model="expenseData.amount"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Amount of Expense"
              required
            />
          </div>

          <div class="mb-5">
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Date</label
            >
            <input
              type="date"
              v-model="expenseData.date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Set Your Budget"
              required
            />
          </div>

          <div class="mb-5">
            <btn-orange @click="addExp">Add Expense</btn-orange>
          </div>
        </div>

        <div class="mt-10 shadow-md p-10">
          <h2
            class="font-semibold mb-4 text-lg dark:text-white flex items-center"
          >
            <icon name="ion:add" size="36"></icon>
            Add New Expense Category
          </h2>
          <input
            type="text"
            v-model="newCategory"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New Category Name"
            required
          />
          <btn-orange class="mt-5" @click="addCategory"
            >Add Category</btn-orange
          >
        </div>
      </div>

      <div class="col-span-2">
        <div class="">
          <h2 class="font-semibold mb-4 text-xl dark:text-white">
            Total Budgets of Each Month
          </h2>
          <div class="relative overflow-x-auto">
            <table
              v-if="budgets.size"
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Month</th>
                  <th scope="col" class="px-6 py-3">Total Budget</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="[key, value] in budgets"
                  :key="key.toString()"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ key }}
                  </th>
                  <td class="px-6 py-4">{{ value }}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-start" v-else>
              <span class="font-semibold text-gray-500">
                You havent set any budgets yet.
              </span>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <h2 class="font-semibold mb-4 text-xl dark:text-white">
            Expense List Of Current Month
          </h2>
          <div class="relative overflow-x-auto">
            <table
              v-if="allExpenses.length > 0"
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Expense Category</th>
                  <th scope="col" class="px-6 py-3">Amount</th>
                  <th scope="col" class="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in allExpenses"
                  :key="item.id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ item.category }}
                  </th>
                  <td class="px-6 py-4">{{ item.amount }}</td>
                  <td class="px-6 py-4">{{ item.date }}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-start" v-else>
              <span class="font-semibold text-gray-500">
                You havent enter any expense yet.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </container>
  <Teleport to="body">
    <AlertModal
      :title="modalSettings.title"
      :desc="modalSettings.desc"
      :button="modalSettings.buttonText"
      :type="modalSettings.type"
      :isVisible="modalSettings.visibility"
      @close="closeModal"
    />
  </Teleport>
</template>

<script setup lang="ts">
import container from "~/components/container.vue";
import { useCatStore } from "~/store/categories";
import { useExpenseStore } from "~/store/expense";
import { useBudgetStore } from "../store/budget";
import btnOrange from "~/components/buttons/btn-orange.vue";
import AlertModal from "~/components/alert.vue";

interface modalSetting {
  title: string;
  desc: string;
  buttonText: string;
  type: string;
  link?: string;
}

const catStore = useCatStore();
const expenseStore = useExpenseStore();
const budgetStore = useBudgetStore();

const { categories } = storeToRefs(catStore);
const { budgets } = storeToRefs(budgetStore);
const { allExpenses } = storeToRefs(expenseStore);

const { addExpense, deleteExpense } = expenseStore;
const { addBudget } = budgetStore;
const { addNewCategory, checkIsExist } = catStore;

const newCategory = ref("");

const modalSettings = reactive({
  visibility: false,
  title: "",
  desc: "",
  buttonText: "",
  type: "",
});

const closeModal = () => {
  modalSettings.visibility = false;
};

const openModal = () => {
  modalSettings.visibility = true;
};

const setModalSettings = ({ title, desc, buttonText, type }: modalSetting) => {
  modalSettings.title = title;
  modalSettings.desc = desc;
  modalSettings.buttonText = buttonText;
  modalSettings.type = type;
};

const expenseData = reactive({
  category: "",
  amount: 0,
  date: new Date(),
  id: "",
});

const budgetData = reactive({
  date: new Date(),
  amount: 0,
});

const addCategory = () => {
  if (newCategory.value !== "" && !checkIsExist(newCategory.value)) {
    addNewCategory(newCategory.value);
    newCategory.value = "";
    return;
  }
  
  else if (newCategory.value === "") {
    setModalSettings({
      title: "Missing Required Area",
      desc: "Please enter a valid category name",
      type: "error",
      buttonText: "Confirm",
    });
    openModal();
  }

  else if (checkIsExist(newCategory.value)) {
    setModalSettings({
      title: "Category Exist",
      desc: "Entered category alreay exist please enter different one",
      type: "error",
      buttonText: "Confirm",
    });
    openModal();
  } 



};

const addExp = () => {
  if (expenseData.category !== "" && expenseData.amount !== 0)
    addExpense({
      category: expenseData.category,
      id: Math.floor(Math.random() * 100).toString(),
      date: expenseData.date,
      amount: expenseData.amount,
    });
  else {
    setModalSettings({
      title: "Missing Required Area",
      desc: "Plesea enter expense amount, category and date if desired category don't exist please add it first",
      buttonText: "Confirm",
      type: "error",
    });
    openModal();
  }
};

const addBud = () => {
  if (budgetData.amount !== 0) {
    addBudget({
      date: budgetData.date,
      amount: budgetData.amount,
    });
  } else {
    setModalSettings({
      title: "Missing Required Area",
      desc: "Please enter required areas before enter or set",
      buttonText: "Confirm",
      type: "error",
    });
    openModal();
  }
};

//v-focus custom directive
const vFocus = {
  mounted: (el: any) => el.focus(),
};
</script>

<style lang="css" scoped>
.dummy {
  color: red;
}
</style>
