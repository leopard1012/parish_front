import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataBinding from '../views/DataBinding2.vue'
import ServiceAttendance from '../views/ServiceAttendance.vue'
import Login from '../views/LoginView'
import GoogleLogin from '../views/GoogleLogin'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/databinding',
    name: 'DataBinding',
    component: DataBinding
  },
  {
    path: '/attendance',
    name: 'ServiceAttendance',
    component: ServiceAttendance
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/googleLogin',
    name: 'GoogleLogin',
    component: GoogleLogin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
