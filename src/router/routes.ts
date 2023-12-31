import { RouteRecordRaw } from 'vue-router'

// @mimas: allocated root path of current app, defined in package.json
const appPath = process.env.appPath as string

const routes: RouteRecordRaw[] = [
  {
    path: appPath,
    component: () => import('layouts/MainLayout.vue'),
    redirect: appPath + '/dns',
    children: [
      {
        path: 'dns',
        component: () => import('pages/dns/DnsIndex.vue'),
        redirect: appPath + '/dns/list',
        children: [
          {
            path: 'list',
            component: () => import('pages/dns/CurrentList/DnsCurrentList.vue'),
            redirect: appPath + '/dns/list/check',
            children: [
              {
                path: 'check',
                component: () => import('pages/dns/CurrentList/CheckData.vue')
              },
              {
                path: 'domain',
                component: () => import('pages/dns/CurrentList/NxDomain.vue')
              },
              {
                path: 'person',
                component: () => import('pages/dns/CurrentList/PersonalUser.vue')
              },
              {
                path: 'parse',
                component: () => import('pages/dns/CurrentList/SuccessParsed.vue')
              }
            ]
          },
          {
            path: 'history',
            component: () => import('pages/dns/DnsHistory.vue')
          },
          {
            path: 'area',
            component: () => import('pages/dns/UserArea.vue')
          }
        ]
      },

      // @mimas: about, updates, releases...
      {
        path: 'about',
        component: () => import('pages/AboutPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
