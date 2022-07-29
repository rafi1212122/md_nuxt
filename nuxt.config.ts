import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/assets/semantic.min.css'
    ],
    modules: [
        '@nuxt/image-edge'
    ],
    image: {
        domains: ['uploads.mangadex.org']
    }
})
