import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import trending from '../views/trending.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/NewPost',
    name: 'newpost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewPost.vue')
  },
  {
    path: '/trending',
    name: 'trending',
    component: trending,
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
