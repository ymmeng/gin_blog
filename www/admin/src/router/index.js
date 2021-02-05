import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面路由组件
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import AdminIndex from '../components/admin/AdminIndex.vue'
import AddArt from '../components/article/AddArt.vue'
import ArtList from '../components/article/ArtList.vue'
import CateList from '../components/category/CateList.vue'
import UserList from '../components/user/UserList.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '请登录'
    },
    component: Login
  },
  {
    path: '/',
    name: 'admin',
    meta: {
      title: '后台管理页面'
    },
    component: Admin,

    children: [{
      path: '/index',
      component: AdminIndex,
      meta: {
        title: '仪表盘'
      }
    },
    {
      path: '/addart',
      component: AddArt,
      meta: {
        title: '新增文章'
      }
    },
    {
      path: '/editart/:id',
      component: AddArt,
      meta: {
        title: '编辑文章'
      },
      props: true
    },
    {
      path: '/artlist',
      component: ArtList,
      meta: {
        title: '文章列表'
      }
    },
    {
      path: '/catelist',
      component: CateList,
      meta: {
        title: '分类列表'
      }
    },
    {
      path: '/userlist',
      component: UserList,
      meta: {
        title: '用户列表'
      }
    }]
  }]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()

  const userToken = window.sessionStorage.getItem('token')
  if (to.path === '/Login') return next()
  if (!userToken) {
    next('/Login')
  } else {
    next()
  }
})
export default router
