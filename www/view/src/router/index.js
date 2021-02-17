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

// 路由导航
router.beforeEach((to, from, next) => {
  Modal.destroyAll();
  // 修改网页名字
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  //路由中设置的needLogin字段就在to当中 
  if (window.sessionStorage.data) {
    if (to.path === '/login') {
      next("/");
    } else {
      next();
    }
  } else {
    // 如果没有session ,访问任何页面。都会进入到 登录页
    if (to.path === '/' || to.path === '/login' || to.path === '/registered') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
    }
  }
})

export default router
