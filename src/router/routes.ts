import type { RouteRecordRaw } from 'vue-router'
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { FunctionalComponent } from 'vue';
export type RouteRecordRawEx = { meta?: { title: string, icon?: string | FunctionalComponent, hidden?: boolean }, children?: RouteRecordRawEx[] } & RouteRecordRaw
export const menuRoutes: RouteRecordRawEx[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/',
    component: () => import('@/components/Layout/index.vue'),
    meta: { title: 'layout', icon: 'layout' },
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页', icon: HomeOutlined },
      },
      {
        path: '/icon',
        name: 'icon-list',
        component: () => import('@/components/SvgIcon/List.vue'),
        meta: { title: 'Svg图标列表', icon: AppstoreOutlined },
      }
    ]
  }
]

const routes: RouteRecordRaw[] = menuRoutes

export default routes
