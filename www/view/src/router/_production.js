let name = " - 幽梦";

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    meta: {
      title: 'Ymmeng'
    },
    component: resolve => void (require(['@/views/Index.vue'], resolve)),
    children: [
      {
        path: '/my',
        name: '个人主页',
        meta: {
          title: '个人主页' + name
        },
        component: resolve => void (require(['@/views/user/MyOnly.vue'], resolve)),
      },
      {
        path: 'drawBed',
        name: 'drawBed',
        meta: {
          title: '图床' + name
        },
        component: resolve => void (require(['@/views/drawBed/DrawBed.vue'], resolve)),
      },
      {
        path: '/drawBed/:id',
        name: 'drawBed.details',
        meta: {
          title: '图床详情' + name
        },
        props: true,
        component: resolve => void (require(['@/views/drawBed/DrawBedItem.vue'], resolve)),
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
        path: '/',
        name: 'art',
        redirect: '/',
        component: resolve => void (require(['@/views/article/Content.vue'], resolve)),
        children: [
          {
            path: '/',
            name: 'content',
            meta: {
              title: '首页' + name
            },
            component: resolve => void (require(['@/views/article/ArtList.vue'], resolve)),
          },
          {
            path: '/cateList/:id',
            meta: {
              title: `文章列表` + name
            },
            props: true,
            component: resolve => void (require(['@/views/article/ArtList.vue'], resolve)),
          },
          {
            path: '/about',
            name: 'about',
            meta: {
              title: '关于' + name
            },
            component: resolve => void (require(['@/views/About.vue'], resolve)),
          },
        ]
      }
    ],
  },
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
    path: '/404',
    name: '404',
    component: resolve => void (require(['@/views/404'], resolve)),
    meta: {
      title: '404' + name
    },
  },
]

export default routes