import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面路由组件
import AdminLogin from '../views/AdminLogin.vue'
import Admin from '../views/Admin.vue'
import Index from '../views/Index.vue'
import AdminIndex from '../components/admin/AdminIndex.vue'
import AddArt from '../components/article/AddArt.vue'
import ArtList from '../components/article/ArtList.vue'
import CateList from '../components/category/CateList.vue'
import UserList from '../components/user/UserList.vue'
import Registered from '../components/registered.vue'
import Login from '../components/Login.vue'
import Article from '../components/Article.vue'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'index',
  component: Index,
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
{
  path: '/adminLogin',
  name: 'adminLogin',
  component: AdminLogin
},
{
  path: '/admin',
  name: 'admin',
  component: Admin,

  children: [{
    path: '/admin/index',
    component: AdminIndex
  },
  {
    path: '/admin/addart',
    component: AddArt
  },
  {
    path: '/admin/editart/:id',
    component: AddArt,
    props: true
  },
  {
    path: '/admin/artlist',
    component: ArtList
  },
  {
    path: '/admin/catelist',
    component: CateList
  },
  {
    path: '/admin/userlist',
    component: UserList
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.path == '/login') return next()
  if (!token && to.path == '/admin/' || to.path == 'admin/*') {
    next('/adminLogin')
  } else {
    next()
  }
})
export default router
