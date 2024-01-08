import { defineStore } from "pinia";


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
        "investment"
    ])

    const errorMsg = ref('')

    const addNewCategory = (catName:string) => {
        if(!categories.value.includes(catName)){
            categories.value.push(catName)
        }
        else{
            errorMsg.value = "Its category already exist"
        }
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
        errorMsg
    }
})