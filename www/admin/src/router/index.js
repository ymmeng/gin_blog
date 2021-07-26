import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面路由组件
Vue.use(VueRouter)
const routes = [
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '请登录'
    },
    component: () => import("@/views/Login.vue")
  },
  {
    path: '/',
    name: 'admin',
    meta: {
      title: '后台管理页面'
    },
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: '/index',
        component: () => import("../components/admin/AdminIndex.vue"),
        meta: {
          title: '仪表盘'
        }
      },
      {
        path: '/addart',
        component: () => import("../components/article/AddArt.vue"),
        meta: {
          title: '新增文章'
        }
      },
      {
        path: '/editart/:id',
        component: () => import("../components/article/AddArt.vue"),
        meta: {
          title: '编辑文章'
        },
        props: true
      },
      {
        path: '/artlist',
        component: () => import("../components/article/ArtList.vue"),
        meta: {
          title: '文章列表'
        }
      },
      {
        path: '/catelist',
        component: () => import("../components/category/CateList.vue"),
        meta: {
          title: '分类列表'
        }
      },
      {
        path: '/userlist',
        component: () => import("../components/user/UserList.vue"),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/drawbed',
        component: () => import("../components/drawBed/DrawBed.vue"),
        meta: {
          title: '图床列表'
        }
      }
    ]
  }]

const router = new VueRouter({
  // mode: 'history',
  routes: routes,
})

// 解决路由重复报错问题
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const userToken = window.sessionStorage.getItem('token')
  if (to.path === '/Login') return next()
  if (!userToken) {
    next('/Login')
  } else {
    next()
  }
})
export default router
