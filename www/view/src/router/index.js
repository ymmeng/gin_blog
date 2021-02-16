import Vue from 'vue'
import VueRouter from 'vue-router'
import { Modal } from 'ant-design-vue';

// 页面路由组件
import productionRoutes from './_production'

Vue.use(VueRouter)

const routes = [
  ...productionRoutes
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: routes
})


// 解决路由重复报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  Modal.destroyAll();
  // 修改网页名字i
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const token = window.sessionStorage.getItem('token')

  if (to.path == '/login') return next()
  if (!token && to.path == '/app/' || to.path == 'app/*') {
    next('/login')
  } else {
    // 已登录的用户重定向非登录界面
    if (token && to.name == 'login') {
      router.push('/app');
      next('/app');
    }
    next();
  }
})
export default router
