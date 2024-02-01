import { defineStore } from "pinia";

interface expenseData {
    id: string;
    category: string,
    amount: number,
    date: Date,
}

interface errorMsg {
    status: boolean;
    msg: string;
}

export const useExpenseStore = defineStore('expenseStore', () => {

    // all expense data array
    const allExpenses = ref<expenseData[]>([]);


    // all expense data grouping with month - map
    const expensesByDate = ref<Map<String, expenseData[]>>(new Map())

    //all expense data grouping with there categories - map
    const expenseByCat = ref<Map<String, expenseData[]>>(new Map())

    const errorMsg = ref<errorMsg>({
        status: false,
        msg: 'lorem',
    })

    //get info of selected expense
    const getSelectedExpenseIndex = (id: string) => {
        let selextedIndex = allExpenses.value.findIndex((item => {
            item.id === id
        }))

        return selextedIndex
    }

    //add new expense to allExpense Array
    const addExpense = (expenseData: expenseData) => {
        allExpenses.value.push(expenseData)
    }

    //delete expense in the allExpense Array
    const deleteExpense = (expenseID: string) => {
        const index = getSelectedExpenseIndex(expenseID)

        if (index) {
            allExpenses.value.splice(index, 0)
        }
    }

    //Update specific expense data
    const updateExpense = (expenseID: string, updatedData: expenseData) => {
        const index = getSelectedExpenseIndex(expenseID)
        if (index) {
            allExpenses.value[index] = updatedData;
        }
    }

    // get total expense of specific month
    const getTotalExpenseByDate = ((date: Date) => {
        const monthYearKeyString = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
        const selectedMonthExpenses = expensesByDate.value.get(monthYearKeyString)

        if (selectedMonthExpenses !== undefined) {
            return selectedMonthExpenses.reduce((sum, item) => sum + item.amount, 0)
        }

        else {
            return 0
        }
    })


    // total expsense of all the time
    const totalExpense = computed(() => {
        return allExpenses.value.reduce((sum, item) => sum + item.amount, 0)
    })


    // its filter expense arry due to their date (month) and create map object
    const setExpensesByDate = () => {
        allExpenses.value.forEach((item) => {
            const monthYearKeyString = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-01`;

            if (expensesByDate.value.has(monthYearKeyString)) {
                let selectedMonthExpenses = expensesByDate.value.get(monthYearKeyString) as expenseData[];

               if(selectedMonthExpenses.every((expense)=> expense.id !== item.id)){
                   selectedMonthExpenses?.push(item)
               }
            }

            else {
                expensesByDate.value.set(monthYearKeyString, [item])
            }

        })

    }

    //its filder expense array due to their category and create map object
    const setExpensesByCat = () => {
        allExpenses.value.forEach((item) => {
            const category = item.category;
            if (expenseByCat.value.has(category)) {
                let currentCat = expenseByCat.value.get(category) as expenseData[] | undefined;

                if (currentCat !== undefined) {
                    currentCat.push(item)
                }

            }

            else {
                expenseByCat.value.set(category, [item])
            }

        })

    }

    const getExpenseByDate = (date: Date) => {
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-01`
        return expensesByDate.value.get(key)
    }

    const getExpenseByCat = (category: String) => {
        return expenseByCat.value.get(category)
    }

    return {
        setExpensesByDate,
        setExpensesByCat,
        getExpenseByDate,
        getExpenseByCat,
        allExpenses,
        expensesByDate,
        getTotalExpenseByDate,
        addExpense,
        errorMsg,
        deleteExpense,
        updateExpense,
        totalExpense
    }
})