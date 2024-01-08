<template>
  <container class="mt-10">
    <div class="grid md:grid-cols-3 gap-10">
      <div class="col-span-1">

        <div class="mb-10 shadow-md p-10">
          <h2 class="font-semibold mb-4 text-xl dark:text-white flex items-center">
            <icon name="ion:add" size='36' ></icon>
            Add Your Budgets
          </h2>
          <label
            for="budget"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Budget</label
          >

          <input
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
            placeholder="Set Your Budget"
            required
          />

          <btn-orange class="mt-5">Set Budget</btn-orange>
        </div>

        <div class="shadow-md p-10 mb-5">
          <div class="mb-5">
          <h2 class="font-semibold mb-4 text-xl dark:text-white flex items-center">
           <icon name="ion:add" size='36' ></icon>
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
          <h2 class="font-semibold mb-4 text-lg dark:text-white flex items-center">
          <icon name="ion:add" size='36' ></icon>
          Add New Expense Category
        </h2>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New Category Name"
            required
          />
          <btn-orange  class="mt-5"   @click="addExp">Add Category</btn-orange>
        </div>
      </div>

      <div class="col-span-2">
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
                v-for="(item, index) in allExpenses" :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                 {{item.category}}
                  
                </th>
                <td class="px-6 py-4">{{ item.amount}}</td>
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
  </container>
</template>

<script setup lang="ts">
import container from "~/components/container.vue";
import { useCatStore } from "~/store/categories";
import { useExpenseStore } from "~/store/expense";
import {useBudgetStore} from '../store/budget'
import btnOrange from "~/components/buttons/btn-orange.vue";
import alert from "~/components/alert.vue";

const catStore = useCatStore();
const expenseStore = useExpenseStore();
const budgetStore = useBudgetStore();

const { categories } = storeToRefs(catStore);
const { budgets } = storeToRefs(budgetStore);
const {allExpenses } =  storeToRefs(expenseStore)

const {addExpense , deleteExpense } = expenseStore
const {addBudget} = budgetStore

const expenseData = reactive({
    category:"no name",
    amount:0,
    date:new Date(),
    id:""
})

const addExp  = () =>{
    addExpense({
        category:expenseData.category,
        id : Math.floor(Math.random() * 100).toString(),
        date:expenseData.date,
        amount:expenseData.amount
    })
}

</script>

<style lang="css" scoped></style>
