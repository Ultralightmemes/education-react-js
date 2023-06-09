import axios from "axios";

// export const API_URL = 'http://localhost:8000/'
export const API_URL = 'https://5-180-182-221.cloud-xip.com/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('access')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    }
    config.headers["Access-Control-Allow-Origin"] = '*'
    return config;
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401) {
        try {
            const response = await axios.post(`${API_URL}token/refresh/`, {
                refresh: localStorage.getItem('refresh')
            }, {withCredentials: true,})
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            window.location.reload()
        }
    }
})

export default $api