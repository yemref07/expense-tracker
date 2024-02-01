import { defineStore } from "pinia";

interface expenseData {
    id: string;
    category: string,
    amount: number,
    date: Date,
}


export const useCatStore = defineStore('catStore',()=>{
    const categories = ref<string[]>([
        "tax",
        "insurance",
        "rent",
        "gas",
        "transport",
        "groceries",
        "dining out",
        "gym",
        "health",
        "entertaintment",
        "education",
        "loans",
        "investment",
    ])

    const addNewCategory = (catName:string) => {
       categories.value.push(catName)
    }

    const checkIsExist = (catName:string):boolean => {
        return categories.value.includes(catName)
    }

    const removeCategory = (catName:string)=>{
      let index = categories.value.findIndex((item)=>{
            return item === catName
        })

        if (index) {
            categories.value.splice(index, 0)
        }
    }

    return{ 
        categories,
        addNewCategory,
        removeCategory,
        checkIsExist,
    }
})