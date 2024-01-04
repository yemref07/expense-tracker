import { defineStore } from 'pinia'

export const useAuthStore = defineStore('signIn', () => {
    const userInfo = ref()
    const isAuthenticated = ref(false)
    const isLoading = ref(false)

    interface userPayload {
        id: string;
        password: string;
    }

    // ! Login with using default fecth 
    const loginUser = async ({ id, password }:userPayload) => {
        isLoading.value = true

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: id,
                    password: password,
                })
            });
            userInfo.value = await response.json()
            if (userInfo.value) {
                const token = useCookie('token');
                token.value = userInfo.value?.token;
                isAuthenticated.value = true

                const userData = useCookie('userData');
                userData.value = userInfo.value
            }
        }

        catch (error) {
            console.error('Error while logging in:', error);
        }

        finally {
            isLoading.value = false;
        }

    }

    const logUserOut = () => {
        const token = useCookie('token');
        isAuthenticated.value = false;
        token.value = null


        const userData = useCookie('userData');
        userData.value = null
    }


    // ! login with using nuxt useFetch
    // const loginUser = async ({ id, password }: userPayload) => {
    //     const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: {
    //             username:id,
    //             password:password,
    //         },
    //     });
    //     isLoading.value = pending;
    //     if(data.value){
    //         const token = useCookie('token');
    //         token.value = data.value?.token;
    //         isAuthenticated.value = true;
    //     }

    // }

    return {
        loginUser,
        userInfo,
        logUserOut,
        isAuthenticated
    }
})