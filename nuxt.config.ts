export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        pageTransition: { name: 'fade', mode: 'out-in' }
    },
    css: [
        '@/static/global.css',
    ],
    modules: ['@nuxt/ui']
})
