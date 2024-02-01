<template>
    <div class="card dark:text-white">
        <div class="mb-2">
            <span class="text-gray-600 dark:text-white">$</span>
            <span class="font-bold text-2xl align-middle">{{topThreeTotal()}} </span>

            <p class="text-gray-400">Top Categories</p>
        </div>
        <DoughnutChart v-if="dataStatus" :options="doughnutChartOptions" :data="doughnutChartData1" />
        <div v-else>
            <h3 class="text-xl text-red-500 font-semibold text-center">No Data</h3>     
        </div>
    </div>
</template>

<script setup>
import DoughnutChart from "./charts/DoughnutChart.vue";
import { useExpenseStore } from "~/store/expense";
import { useCatStore } from "../store/categories";

const expenseStore = useExpenseStore();
const { expensesByDate } = storeToRefs(expenseStore);
const dataStatus = ref(false)

const getTopThreeExpenses = () => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-01`;
    //check key is exist
    if (expensesByDate.value.has(key)) {
        const currentExpense = expensesByDate.value.get(key);

        //check value is not undefined and not an empty array
        if (currentExpense.length > 0 && currentExpense) {
            const sortedCurrExpense = [...currentExpense].sort(
                (a, b) => a.amount - b.amount
            );

            //check arrays has 3 elements or more
            if (sortedCurrExpense.length >= 3) {
                dataStatus.value =  true
                return sortedCurrExpense.slice(-3);
            }

            //if sortedArr has less that 3 elements just return it directly
            else {
                dataStatus.value =  true
                return sortedCurrExpense;
            }

        }
    } 
    else {
        dataStatus.value = false
        return [];
    }
};

const topThreeLabel = () => {
    const topThreeExpenses = getTopThreeExpenses();
    if (topThreeExpenses) {
        return topThreeExpenses.map((item) => {
            return item.category;
        });
    } else {
        return [];
    }
};

const topThreeAmount = () => {
    const topThreeExpenses = getTopThreeExpenses();
    if (topThreeExpenses) {
        return topThreeExpenses.map((item) => {
            return item.amount;
        });
    } else {
        return [];
    }
};

const topThreeTotal = () => {
    const amounts = topThreeAmount()
    if(amounts.length > 0){
       return amounts.reduce((total,currentValue)=>total + currentValue,0)
    }
    else{
        return 0
    }
}


const doughnutChartData1 = ref({
    labels: topThreeLabel(),
    datasets: [
        {
            data: topThreeAmount(),
        },
    ],
});

const doughnutChartOptions = ref({
    responsive: true,
    backgroundColor: ["rgb(219,107,135)", "rgb(100,194,219)", "rgb(116,118,237)"],
    borderColor: ["rgb(219,107,135)", "rgb(100,194,219)", "rgb(116,118,237)"],
    hoverOffset: 10,
    plugins: {
        legend: {
            display: false,
        },
    },
});
</script>

<style lang="css" scoped></style>
