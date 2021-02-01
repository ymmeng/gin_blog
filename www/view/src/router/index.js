import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面路由组件
import Home from '../views/Home.vue'
import Registered from '../components/Page/registered.vue'
import Login from '../components/Page/Login.vue'
import Article from '../components/Page/Article.vue'
import About from '../views/About.vue'
import MyOnly from '../components/Page/MyOnly.vue'
import AddArt from '../components/Page/AddArt.vue'

let name = " - 幽梦";

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页' + name
    },
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于' + name
    },
    component: About,
  },
  {
    path: '/article/:id',
    component: Article,
    meta: {
      title: `文章详情` + name
    },
    props: true
  },
  {
    path: '/registered',
    name: 'registered',
    meta: {
      title: '注册' + name
    },
    component: Registered
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录' + name
    },
    component: Login
  },
  {
    path: '/addArt',
    name: 'addArt',
    meta: {
      title: '写文章' + name
    },
    component: AddArt,
  },
  {
    path: '/my',
    name: '个人主页',
    meta: {
      title: '个人主页' + name
    },
    component: MyOnly,
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const token = window.sessionStorage.getItem('token')
  if (to.path == '/login') return next()
  if (!token && to.path == '/admin/' || to.path == 'admin/*') {
    next('/login')
  } else {
    next()
  }
})
export default router
