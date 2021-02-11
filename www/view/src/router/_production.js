let name = " - 幽梦";

const routes = [
  {
    path: '/registered',
    name: 'registered',
    meta: {
      title: '注册' + name
    },
    component: resolve => void (require(['@/views/auth/Registered.vue'], resolve)),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录' + name
    },
    component: () => import("@/views/auth/Login.vue")
  },
  {
    path: '/',
    name: 'home',
    redirect: '/app',
    meta: {
      title: ''
    },
    component: resolve => void (require(['@/views/Home.vue'], resolve)),

    children: [
      {
        path: '/app',
        name: 'about',
        meta: {
          title: '首页' + name
        },
        component: resolve => void (require(['@/components/Index/Content.vue'], resolve)),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于' + name
        },
        component: resolve => void (require(['@/views/About.vue'], resolve)),
      }
    ],
  },
  {
    path: '/article/:id',
    meta: {
      title: `文章详情` + name
    },
    props: true,
    component: resolve => void (require(['@/views/article/Article.vue'], resolve)),
  },
  {
    path: '/addArt',
    name: 'addArt',
    meta: {
      title: '写文章' + name
    },
    component: resolve => void (require(['@/views/article/AddArt.vue'], resolve)),
  },
  {
    path: '/my',
    name: '个人主页',
    meta: {
      title: '个人主页' + name
    },
    component: resolve => void (require(['@/views/user/MyOnly.vue'], resolve)),
  },
  {
    path: "*",
    redirect: "/404",
    path: '/404',
    name: '404',
    component: resolve => void (require(['@/views/404'], resolve)),
    meta: {
      title: '404' + name
    },
  },
]

export default routes