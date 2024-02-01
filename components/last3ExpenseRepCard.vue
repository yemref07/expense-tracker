<template>
  <div class="card dark:text-white">
    <div class="mb-2">
      <span class="text-gray-600 dark:text-white">$</span>
      <span class="font-bold text-2xl align-middle">{{
        sumLast3ExpenseTotals() || 0
      }}</span>

      <p class="text-gray-400 dark:text-white">Last 3 Mounths Total Expenses</p>
    </div>
    <PolarAreaChart :data="polarAreaChartData" />
  </div>
</template>

<script setup lang="ts">
import PolarAreaChart from "~/components/charts/PolarAreaChart.vue";
import { useExpenseStore } from "~/store/expense";
interface expenseData {
  id: string;
  category: string;
  amount: number;
  date: Date;
}

const expenseStore = useExpenseStore();
const { getTotalExpenseByDate, getExpenseByDate } = expenseStore;

const getLastMonth = reactive(() => {
  const today = new Date();
  return new Date(today.setMonth(today.getMonth() - 1));
});

const getTwoMonthAgo = reactive(() => {
  const today = new Date();
  return new Date(today.setMonth(today.getMonth() - 2));
});

const today = ref(new Date());
const twoMonthAgo = ref(getTwoMonthAgo())
const lastMonth = ref(getLastMonth())



const last3ExpenseTotals = () => {
  const todayTotal = getTotalExpenseByDate(today.value);
  const lastMonthTotal = getTotalExpenseByDate(lastMonth.value);
  const twoMonthAgoTotal = getTotalExpenseByDate(twoMonthAgo.value);

  console.log([todayTotal, lastMonthTotal, twoMonthAgoTotal]);
  return [todayTotal, lastMonthTotal, twoMonthAgoTotal];
};

const sumLast3ExpenseTotals = (): number => {
  return last3ExpenseTotals().reduce(
    (sum, item: number): number => sum + item,
    0
  );
};

const getMonthName = (param: Date) => {
  return param.toLocaleString("en-us", { month: "long" });
};

const polarAreaChartData = ref({
  labels: [
    getMonthName(today.value),
    getMonthName(lastMonth.value),
    getMonthName(twoMonthAgo.value),
  ],
  datasets: [
    {
      data: last3ExpenseTotals(),
      backgroundColor: [
        "rgb(219,107,135,0.5)",
        "rgb(100,194,219,0.5)",
        "rgb(116,118,237,0.5)",
      ],
      borderColor: [
        "rgb(219,107,135,0.5)",
        "rgb(100,194,219,0.5)",
        "rgb(116,118,237,0.5)",
      ],
    },
  ],
});
</script>

<style lang="css" scoped></style>
