import {defineStore} from 'pinia'
interface budgetData{
    amount:string,
    date:Date
}


export const useBudgetStore = defineStore('budget-store',()=>{
    const budgets = ref<Map<Date,string>>(new Map())

    const addBudget = (param:budgetData)=>{
        budgets.value.set(param.date,param.amount)
    }

    return{ 
        budgets,
        addBudget
    }
})