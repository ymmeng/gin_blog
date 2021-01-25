import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面路由组件
import Index from '../views/Home.vue'
import Registered from '../components/Page/registered.vue'
import Login from '../components/Page/Login.vue'
import Article from '../components/Page/Article.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/article/:id',
    component: Article,
    props: true
  },
  {
    path: '/registered',
    name: 'registered',
    component: Registered
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.path == '/login') return next()
  if (!token && to.path == '/admin/' || to.path == 'admin/*') {
    next('/login')
  } else {
    next()
  }
})
export default router
