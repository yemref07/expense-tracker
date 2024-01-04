interface MonthlyTotal {
  [key: string]: number;
}


interface expenseData {
  id: string;
  category: string,
  amount: number,
  date: Date,
}

//its compute total expense of the each month
export const getTotalExpense = (expensesByMonth: Map<string, expenseData[]>) => {

  // const monthlyTotal: MonthlyTotal = {}

  const monthlyTotal = ref<MonthlyTotal>({})

  expensesByMonth.forEach((value, key) => {
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      sum += value[i].amount;
    }

    monthlyTotal.value[key] = sum

  });

  const getTotal = (monthName:string) => {
    return monthlyTotal.value[monthName] || 0
  }

  return {
    monthlyTotal,
    getTotal
  }
}