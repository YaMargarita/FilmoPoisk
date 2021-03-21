import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/film/:id',
        name: 'Film',
        props: true,
        component: () => import('../components/Film.vue')
    },
    {
        path: '/like',
        name: 'Like',
        component: () => import('../components/Like.vue')
    },
    {
        path: '/filmcard',
        name: 'FilmCard',
        props: true,
        component: () => import('../components/FilmCard.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router