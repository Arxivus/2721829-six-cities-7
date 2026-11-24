import axios, { AxiosInstance } from "axios";

const baseURL = 'https://14.design.htmlacademy.pro/six-cities'
const timeout = 5000

const APIRoutes = {
    Login: '/login',
    Offers: '/offers',
    Favorite: '/favorite'

} as const

const createAPI = (): AxiosInstance => {

    const api = axios.create({
        baseURL: baseURL,
        timeout: timeout,
        headers: {
            'X-Token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
        }
    })

    return api
} 

export {
    createAPI,
    APIRoutes
}