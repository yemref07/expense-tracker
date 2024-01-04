<template>
  <div class="py-3">
    <div class="container mx-auto px-5 md:px-10 xl:px-20 mt-10">
      <div
        class="grid lg:grid-cols-3 xl:grid-cols-4 justify-start items-start gap-6"
      >
        <div
          class="xl:col-span-1 h-full flex flex-col justify-center gap-6 text-center bg-white dark:bg-neutral-800 "
        >

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

          <div class="card dark:text-white">
            <div class="mb-2">
              <span class="text-gray-600 dark:text-white">$</span>
              <span class="font-bold text-2xl align-middle">1200</span>

              <span class="badge-green ms-3 py-1 px-2 text-sm rounded-md">
                <Icon name="solar:arrow-up-line-duotone" class="" size="14" />
                2.2%
              </span>
              <p class="text-gray-400">Top Categories</p>
            </div>
            <DoughnutChart
              :options="doughnutChartOptions"
              :data="doughnutChartData1"
            />
          </div>

        </div>

        <div
          class="xl:col-span-1 h-full flex flex-col  justify-center gap-6 text-center bg-white dark:bg-neutral-800 "
        >
          <div class="card dark:text-white">
            <div class="mb-4">
              <span class="text-gray-600 dark:text-white">$</span>
              <span class="font-bold text-2xl align-middle">700</span>

              <span class="badge-green ms-3 py-1 px-2 text-sm rounded-md">
                <Icon name="solar:arrow-up-line-duotone" class="" size="14" />
                10.2%
              </span>
              <p class="text-gray-400 dark:text-white">Remaining Budget</p>
            </div>
            <span class="text-gray-500 dark:text-white text-sm">%45</span>
            <span class="text-gray-500 dark:text-white text-sm">
              / Total Expense<strong> 1230$</strong></span
            >
            <div
              class="w-full h-4 mb-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"
            >
              <div
                class="h-4 bg-sky-400 rounded-full dark:bg-sky-400"
                style="width: 45%"
              ></div>
            </div>
          </div>

          <div class="card dark:text-white">
            <div class="mb-2">
              <span class="text-gray-600 dark:text-white">$</span>
              <span class="font-bold text-2xl align-middle">1200</span>

              <span class="badge-green ms-3 py-1 px-2 text-sm rounded-md">
                <Icon name="solar:arrow-up-line-duotone" class="" size="14" />
                2.2%
              </span>
              <p class="text-gray-400 dark:text-white">Last 3 Mounths Total Expenses</p>
            </div>
            <PolarAreaChart :data="polarAreaChartData" />
          </div>
        </div>

        <div
          class="xl:col-span-2 h-full bg-white dark:bg-neutral-800 flex flex-col justify-start items-center"
        >
          <div class="mb-2 p-8">
            <h2 class="font-bold text-xl mb-3 dark:text-white mt-3">Last 3 Months İncome</h2>
            <span class="text-gray-600 dark:text-white mt-3">$</span>
            <span class="font-bold text-xl align-middle dark:text-white mt-3">1200</span>
            <span class="badge-green ms-3 py-1 px-2 text-sm rounded-md">
              <Icon name="solar:arrow-up-line-duotone" class="" size="14" />
              2.2%
            </span>
            <p class="text-gray-500 dark:text-white mt-3">
              This month you earn %2 much more money, but your educations
              expense increase %3 percent for this mounth.
            </p>
            <p class="text-gray-500 dark:text-white mt-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus,
              nemo? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aliquid at aperiam iure suscipit in molestias obcaecati fuga saepe
              perferendis. Voluptates.
            </p>
          </div>
          <BarChart class="lg:p-6" />
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
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useRouter } from "#vue-router";
import BarChart from "~/components/charts/BarChart.vue";
import DoughnutChart from "~/components/charts/DoughnutChart.vue";
import LineChart from "~/components/charts/LineChart.vue";
import RadarChart from "~/components/charts/RadarChart.vue";
import PolarAreaChart from "~/components/charts/PolarAreaChart.vue";
const router = useRouter();
const authStore = useAuthStore();

const doughnutChartData1 = ref({
  labels: ["Rent", "Education", "Food"],
  datasets: [
    {
      data: [800, 1000, 400],
    },
  ],
});

const doughnutChartOptions = ref({
  responsive: true,
  backgroundColor: ["rgb(219,107,135)", "rgb(100,194,219)", "rgb(116,118,237)"],
  borderColor:["rgb(219,107,135)", "rgb(100,194,219)", "rgb(116,118,237)"],
  hoverOffset: 10,
  plugins: {
    legend: {
      display: false,
    },
  },
});

const lineChartData = ref({
  labels: ["January", "Febuary", "Marc"],
  datasets: [
    {
      data: [13500, 19000, 19000],
      fill: true,
      borderColor: "#db6b87",
      tension: 0.1,
      backgroundColor:"rgb(255,255,255,0.2)"
    },
  ],
});

const lineChartOptions = ref({
  responsive: true,
  scales: {
    y: {
      // defining min and max so hiding the dataset does not change scale range
      min: 0,
      max: 30000,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
});

const polarAreaChartData = ref({
  labels: ["Rent","Food Shopping","Gas Bill"],
  datasets: [
  {
    data: [1200, 1700, 800],
    backgroundColor: ["rgb(219,107,135,0.5)", "rgb(100,194,219,0.5)", "rgb(116,118,237,0.5)"],
    borderColor:["rgb(219,107,135,0.5)", "rgb(100,194,219,0.5)", "rgb(116,118,237,0.5)"]
  }
  ],
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
</style>
