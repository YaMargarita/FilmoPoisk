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
        path: '/like',
        name: 'Like',
        component: () => import('../components/Like.vue')
    },
    {
        path: '/filmDetail/:id',
        name: 'FilmCard',
        props: true,
        component: () => import('../components/FilmCard.vue')
    },
    {
        path: '/collection/:id',
        name: 'Collection',
        props: true,
        component: () => import('../components/Collection.vue')
    },
    {
        path: '/search/:id',
        name: 'Search',
        props: true,
        component: () => import('../components/Search.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router