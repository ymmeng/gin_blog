import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面路由组件
import Index from '../views/Home.vue'
import Registered from '../components/Page/registered.vue'
import Login from '../components/Page/Login.vue'
import Article from '../components/Page/Article.vue'
import About from '../views/About.vue'
import MyOnly from '../components/Page/MyOnly.vue'

let name = "幽梦-";

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: name + '首页'
    },
    component: Index,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title:  name + '关于'
    },
    component: About,
  },
  {
    path: '/article/:id',
    component: Article,
    meta: {
      title:  name + '文章详情:id'
    },
    props: true
  },
  {
    path: '/registered',
    name: 'registered',
    meta: {
      title: name + '注册'
    },
    component: Registered
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: name + '登录'
    },
    component: Login
  },
  {
    path: '/my',
    name: '个人主页',
    meta: {
      title: name + '个人主页'
    },
    component: MyOnly
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
