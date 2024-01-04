import { ref } from 'vue'

const dummyData = [{
    id: "1",
    mounth: "Marc",
    expenses: [
        {
            expenseID: "123",
            category: 'rent',
            value: '300',
            date: "12.03.2024"
        },
        {
            expenseID: "3252",
            category: 'education',
            value: '100',
            date: "11.03.2024"
        },
        {
            expenseID: "23423",
            category: 'bill',
            value: '188',
            date: "8.03.2024"
        }
    ]
}]


export function useCalcAverage(expensesArr) {
    const sum = ref(0)

    for (let index = 0; index < expensesArr.length; index++) {
        const expenseValue = expensesArr[index]?.value;
        
        if(!isNaN(expenseValue)){
            sum.value += parseFloat(expenseValue);
        }

        else{
            console.error(expensesArr[index]?.value,'Its expense value not a valid number')
        }
    }

    return{
        sum
    }
}