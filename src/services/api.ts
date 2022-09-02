import axios from 'axios'

console.log('ambient', import.meta.env.MODE)

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_LOCAL_URL
})
