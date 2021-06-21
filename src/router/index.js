import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
import {store} from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage,
    props: true
  },
  {
    path: '/catalog',
    name: 'Catalog',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Catalog.vue')
  },
  {
    path: '/form',
    name: 'Form',
    props: true,
    // beforeEnter: authGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    children: [
      {
        path: 'edit',
        name: 'Edit',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../components/ProductEdit.vue'),
      }
    ]
  }
]

function authGuard(from, to, next) {
  if(store.getters.getSession){
    next()
  }else{
    next('/')
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
