import { defineStore } from "pinia";
interface BudgetData {
  amount: Number;
  date: Date;
}

export const useBudgetStore = defineStore("budget-store", () => {
  const budgets = ref<Map<String, Number>>(new Map());

  const addBudget = (param: BudgetData) => {
    const monthYearKeyString = `${param.date.getFullYear()}-${
      param.date.getMonth() + 1
    }-01`;
    budgets.value.set(monthYearKeyString, param.amount);
  };

  const checkBudgetExist = (param: Date) => {
    const monthYearKeyString = `${param.getFullYear()}-${
      param.getMonth() + 1
    }-01`;
    return sortedBudgets.value.some((item) => {
      return item.date === monthYearKeyString;
    });
  };

  const sortedBudgets = computed(() => {
    return Array.from(budgets.value, ([date, amount]) => ({
      date,
      amount,
    })).sort((a, b) => a.amount - b.amount );
  });

  const lastThreeBudget = computed(() => {
    return sortedBudgets.value.slice(0, 3);
  });

  const currentBudget = computed(() => {
    const today = new Date();
    const monthYearKeyString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-01`;
    return sortedBudgets.value.find(({ date, amount }) => {
      return date === monthYearKeyString;
    });
  });

  const getBudgetByDate = (param: Date) => {
    const monthYearKeyString = `${param.getFullYear()}-${
      param.getMonth() + 1
    }-01`;

    let result = sortedBudgets.value.find((item) => {
      return item.date === monthYearKeyString;
    });
    return result;
  };

  return {
    budgets,
    addBudget,
    getBudgetByDate,
    checkBudgetExist,
    sortedBudgets,
    lastThreeBudget,
    currentBudget,
  };
});
