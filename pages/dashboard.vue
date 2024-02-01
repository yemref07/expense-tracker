<template>
  <div class="py-3">
    <container class="mt-10">
      <div
        class="grid lg:grid-cols-3 xl:grid-cols-4 justify-start items-start gap-6"
      >
        <div
          class="xl:col-span-1 h-full flex flex-col justify-center gap-6 text-center bg-white dark:bg-neutral-800"
        >
          <ExpectedEarningsCard />

          <topCatRepCard />
        </div>

        <div
          class="xl:col-span-1 h-full flex flex-col justify-center gap-6 text-center bg-white dark:bg-neutral-800"
        >
          <budgetRepCard />

          <last3ExpenseRepCard />
        </div>

        <div
          class="xl:col-span-2 h-full bg-white dark:bg-neutral-800 flex flex-col justify-start items-center"
        >
          <div class="mb-2 p-8">
            <h2 class="font-bold text-xl mb-3 dark:text-white mt-3">
              Last Months İncome
            </h2>
            <span class="text-gray-600 dark:text-white mt-3">$</span>
            <span class="font-bold text-2xl align-middle dark:text-white mt-3"
              >{{currentBudget?.amount || 0}}</span
            >
            <p class="text-gray-500 dark:text-white mt-3">
            Lorem ipsum dolor sit amet consectetur.
            </p>
            <p class="text-gray-500 dark:text-white mt-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus,
              nemo? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aliquid at aperiam iure suscipit in molestias obcaecati fuga saepe
              perferendis. Voluptates.
            </p>
          </div>
          <BarChart
            class="lg:p-6"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>

      <div class="grid grid-cols-2">
        <div class="h-full flex justify-center items-center">
          <div class="card"></div>
        </div>
        <div class="h-full flex justify-center items-center">
          <div class="card"></div>
        </div>
      </div>
    </container>
    <Teleport to="body">
      <Alert
        title="Hello There, You are new here"
        desc="Add expense and starting keep track that. Its a simple app for tracking your expense and getting statistic about them and some report from it so if you want to start using to app a  let spend some money"
        button="Lets Start"
        link="/budget"
        type="info"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import BarChart from "~/components/charts/BarChart.vue";
import DoughnutChart from "~/components/charts/DoughnutChart.vue";
import { useExpenseStore } from "~/store/expense";
import Alert from "../components/alert.vue";
import container from "../components/container.vue";
import { useBudgetStore } from "~/store/budget";
import budgetRepCard from "~/components/budgetRepCard.vue";
import topCatRepCard from "~/components/topCatRepCard.vue";
import last3ExpenseRepCard from "~/components/last3ExpenseRepCard.vue";
import expectedEarningsCard from "~/components/expectedEarningsCard.vue";

//Initialize our stores
const expensestore = useExpenseStore();
const budgetStore = useBudgetStore();

// get states from store
// const { getExpenseExist } = storeToRefs(expensestore);
const { lastThreeBudget, sortedBudgets, currentBudget } =
  storeToRefs(budgetStore);

const lastThereeLabels = computed(() => {
  return lastThreeBudget.value.map((item) => item.date);
});

const lastThereeAmount = computed(() => {
  return lastThreeBudget.value.map((item) => item.amount);
});

const chartData = ref({
  labels: lastThereeLabels.value,
  datasets: [{ data: lastThereeAmount.value }],
});

const chartOptions = ref({
  responsive: true,
  backgroundColor: ["rgb(219,107,135)", "rgb(100,194,219)", "rgb(116,118,237)"],
  hoverOffset: 40,

  scales: {
    y: {
      // defining min and max so hiding the dataset does not change scale range
      min: 0,
      max: 5000,
    },
  },

  plugins: {
    title: {
      display: true,
      text: "Last 3 Mounts İncomes",
    },

    legend: {
      labels: {
        color: "white",
      },
    },

    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("tr-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
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

.badge-red {
  background-color: #ffeef3;
  color: #f8285a;
}
</style>
