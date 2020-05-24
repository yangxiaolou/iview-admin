import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/modify',
    name: 'modify',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'person_information',
        name: 'person_information',
        meta: {
          icon: 'md-notifications',
          title: '修改信息'
        },
        component: () => import('@/view/single-page/modify/index.vue')
      }
    ]
  },
  {
    path: '/manage',
    name: 'manage',
    meta: {
      icon: 'ios-people',
      title: '用户管理',
      access: [1]
    },
    component: Main,
    children: [
      {
        path: 'registered',
        name: 'registered',
        meta: {
          icon: 'md-trending-up',
          // title: route => {
          //   if (route && route.query.id) {
          //     return '用户编辑'
          //   } else {
          //     return '用户注册'
          //   }
          // }
          title: '用户注册',
          access: [1]
        },
        component: () => import('@/view/components/registered/registered.vue')
      },
      {
        path: 'edit',
        name: 'edit',
        meta: {
          icon: 'md-trending-up',
          title: '用户编辑',
          hideInMenu: true,
          access: [1]
        },
        component: () => import('@/view/components/registered/edit.vue')
      },
      {
        path: 'user_list',
        name: 'user_list',
        meta: {
          icon: 'md-trending-up',
          title: '用户列表',
          access: [1]
        },
        component: () => import('@/view/components/user-list/user-list.vue')
      }
    ]
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'save_job_page',
        name: 'save_job_page',
        meta: {
          icon: 'ios-document',
          hideInMenu: true,
          title: '保存任务计划'
        },
        component: () => import('@/view/schedule/save-job.vue')
      },
      {
        path: 'job_list_page',
        name: 'job_list_page',
        meta: {
          icon: 'md-alarm',
          title: '定时任务管理'
        },
        component: () => import('@/view/schedule/job-list.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'save_message',
        name: 'save_message',
        meta: {
          icon: 'ios-document',
          hideInMenu: true,
          title: '消息编辑'
        },
        component: () => import('@/view/message/save-message.vue')
      },
      {
        path: 'message_list',
        name: 'message_list',
        meta: {
          icon: 'md-alarm',
          title: '消息管理'
        },
        component: () => import('@/view/message/message-list.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
