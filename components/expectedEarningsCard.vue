<template>
  <div class="card dark:text-white">
    <div class="mb-2">
      <span class="text-gray-600 dark:text-white">$</span>
      <span class="font-bold text-2xl align-middle">1200</span>

      <span class="badge-green ms-3 py-1 px-2 text-sm rounded-md">
        <Icon name="solar:arrow-up-line-duotone" class="" size="14" />
        2.2%
      </span>
      <p class="text-gray-400">Expected Earnings</p>
    </div>
    <LineChart :data="lineChartData" :options="lineChartOptions" />
  </div>
</template>

<script setup lang="ts">
import LineChart from "~/components/charts/LineChart.vue";
import { useBudgetStore } from "~/store/budget";

interface BudgetData {
  amount: number;
  date: Date;
}

const budgetStore = useBudgetStore();
const { lastThreeBudget,sortedBudgets } = storeToRefs(budgetStore);

const lastThreeBudgetLabels = computed(() => {
  return lastThreeBudget.value.map((item) => item.date) 

});
const lastThereeBudgetsAmount = computed(() => {
  return lastThreeBudget.value?.map((item) => item.amount);
});

const lineChartData = ref({
  labels: lastThreeBudgetLabels.value,
  datasets: [
    {
      data: lastThereeBudgetsAmount.value,
      fill: true,
      borderColor: "#db6b87",
      tension: 0.1,
      backgroundColor: "rgb(255,255,255,0.2)",
    },
  ],
});

const lineChartOptions = ref({
  responsive: true,
  scales: {
    y: {
      // defining min and max so hiding the dataset does not change scale range
      min: 0,
      max: 5000,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
});
</script>

<style lang="css" scoped></style>
