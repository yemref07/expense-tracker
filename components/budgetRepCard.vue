<template>
  <div class="card dark:text-white">
    <div class="mb-4">
      <span class="text-gray-600 dark:text-white">$</span>
      <span class="font-bold text-2xl align-middle">{{ currentBudget?.amount || 0 }}</span>

      <span class="badge-green ms-3 py-1 px-2 text-sm rounded-md" v-if="budgetReport.budgetInc">
        <Icon name="solar:arrow-up-line-duotone" class="" size="14" />
       {{preBudgetCurRatio}}
      </span>
      <span class="badge-red ms-3 py-1 px-2 text-sm rounded-md" v-else>
        <Icon name="solar:arrow-down-line-duotone" size="14" />
        {{preBudgetCurRatio}}
      </span>

      <p class="text-gray-400 dark:text-white">Remaining Budget :  {{ remainingBudget() }} $</p>
    </div>
    <span class="text-gray-500 dark:text-white text-sm">% {{ budgetExpenseRatio.toFixed(2) }}</span>
    <span class="text-gray-500 dark:text-white text-sm">
      / Total Expense <strong> {{ getTotalExpenseByDate(new Date()) }} $</strong></span
    >
    <div class="w-full h-4 mb-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        class="h-4 bg-sky-400 rounded-full dark:bg-sky-400"
        :style="ratioBarStyle"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBudgetStore } from "~/store/budget";
import { useExpenseStore } from "~/store/expense";

const budgetStore = useBudgetStore();
const { lastThreeBudget, sortedBudgets, currentBudget } = storeToRefs(budgetStore);
const { getBudgetByDate } = budgetStore;

const expenseStore =  useExpenseStore();
const {getTotalExpenseByDate} = expenseStore


const budgetReport = reactive({
  errorMsg:"",
  desc:"",
  budgetInc:false 
})

const remainingBudget = () => {
  if( getBudgetByDate(new Date()) && getTotalExpenseByDate(new Date()) ){
    return getBudgetByDate(new Date())?.amount - getTotalExpenseByDate(new Date())
  }
  else{
    return 'No Data'
  }
}

const budgetExpenseRatio = computed(()=>{
  const currentBudget = getBudgetByDate(new Date())?.amount

  if(currentBudget !== 0 && currentBudget){
    return ( getTotalExpenseByDate(new Date()) /  currentBudget  ) * 100
  }
  else{
    return 0
  }
})


const ratioBarStyle =  computed(()=>{
  if(getTotalExpenseByDate(new Date()) < getBudgetByDate(new Date())?.amount){
    return `width:%${budgetExpenseRatio.value}`
  }
  else{
    return  "width:%100"
  }
})

const preBudgetCurRatio = computed(()=>{
  const today =  new Date()
  const preDate = new Date(today.getFullYear(),today.getMonth()-1,1)
  
  if(getBudgetByDate(today)?.amount !== undefined && getBudgetByDate(preDate)?.amount !== undefined){
    return ((getBudgetByDate(today)?.amount - getBudgetByDate(preDate)?.amount ) / (getBudgetByDate(today)?.amount)* 100 ).toFixed(2)
  }

  else{
    return "No Data"
  }
})

watchEffect(() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate the month and year of the previous month
  let previousMonth = currentMonth - 1;
  let previousYear = currentYear;

  // If the previous month is negative, subtract 1 from the year and set the month to 11 (December)
  if (previousMonth < 0) {
    previousMonth = 11;
    previousYear -= 1;
  }

  // Create a new Date object for the first day of the previous month
  const previousMonthDate = new Date(previousYear, previousMonth, 1);
  let preBudget = getBudgetByDate(previousMonthDate);


  // current and pre month should be exist for creating some dummy report and visually feed back like decrease and increase
  if (preBudget === undefined || currentBudget.value === undefined) {
    budgetReport.errorMsg = "There is no avaible data"
  }

  else if (currentBudget.value.amount > preBudget.amount) {
    budgetReport.budgetInc = true
    budgetReport.desc = "Recently your budget increasing "
  }

  else if(currentBudget.value.amount < preBudget.amount){
    budgetReport.budgetInc = false
    budgetReport.desc =" Recently your budget decreasing "
  }
});

</script>

<style lang="css" scoped>

.card {
  height: 100%;
  border-radius: 10px;
  padding: 20px 40px;
  background-clip: border-box;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.03);
  word-wrap: break-word;
}

.badge-green {
  background-color: #dfffea;
  color: #41cb72;
}

.badge-red{
  background-color: #FFEEF3;
  color: #F8285A;
}
</style>
