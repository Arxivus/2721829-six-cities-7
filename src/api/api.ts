import axios, { AxiosInstance } from "axios";

const baseURL = 'https://14.design.htmlacademy.pro/six-cities'
const timeout = 5000

const APIRoutes = {
    Login: '/login',
    Offers: '/offers',
    Offer: (id: string) => `/offers/${id}`,
    Favorite: '/favorite'

} as const

const createAPI = (): AxiosInstance => {

    const api = axios.create({ baseURL: baseURL, timeout: timeout })

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('six-cities-token')
        if (token) {
            config.headers['X-Token'] = token
        }
        return config
    })

    return api
}

export {
    createAPI,
    APIRoutes
}