<template>
  <header class="header">
    <div class="header-logo">
      PC Manage
    </div>
    <div class="header-main">
      <div class="header-main__sign">
        <a-dropdown>
          <a class="ant-dropdown-link header-main__sign-info" @click.prevent>
            <a-avatar :size="36">
              <template #icon>
                <img src="@/assets/avatar.png" alt="">
              </template>
            </a-avatar>
            Admin
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">Sign out</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
  <section class="container">
    <aside class="menu">
      <a-menu @click="jump" v-model:selectedKeys="current" v-model:openKeys="openKeys" style="width: 100%;height: 100%;"
        mode="inline" :inline-collapsed="false" :items="menus"></a-menu>
    </aside>
    <router-view v-slot="{ Component, route }" :key="router.currentRoute.value.fullPath">
      <section class="main">
        <component :key="route" :is="Component" />
      </section>
    </router-view>
  </section>
</template>
  
<script lang="ts" setup>
import router from '@/router/index'
import { h, ref, VueElement } from 'vue';
import SvgIcon from '../SvgIcon/index.vue'
import { RouteRecordRawEx } from '@/router/routes';
import { DownOutlined } from '@ant-design/icons-vue'
interface MenuType {
  label: VueElement | string,
  key: string,
  icon?: any,
  path: string,
  children?: MenuType[],
}
let menus = ref<MenuType[]>([])
// 生成渲染图标
let renderIcon = (icon?: any) => {
  if (!!icon) {
    if (typeof (icon) === 'function') {
      return () => h(icon)
    } else if (typeof (icon) === 'string') {
      return () => h(SvgIcon, { name: icon })
    }
  }
}
// 拼接路由匹配路径
let subPath = (basePath: string, routePath: string) => {
  let reg = /^(https?:|mailto:|tel:)/;
  if (reg.test(routePath)) {
    return routePath;
  }
  return (basePath + '/' + routePath).split('/').reduce((p, n) => !!n ? p = p + '/' + n : p) || "/"
}
// 遍历路由
let traversal = (route: RouteRecordRawEx, node: MenuType) => {
  if (!!!route || !!!route.children || route.children.length === 0) {
    return
  }
  for (let i = 0; i < route.children.length; i++) {
    node.children = node.children || []
    generateNode(node.children, route.children[i] as RouteRecordRawEx, node)
  }
}
/**
 * 生成菜单节点
 * @param array 父菜单数组
 * @param element 当前遍历路由
 * @param node 父菜单节点
 */
let generateNode = (array: MenuType[], element: RouteRecordRawEx, node?: MenuType,) => {
  // 判断该路由节点是否隐藏
  if (!!!element.meta?.hidden) {
    let item = {
      label: (element.meta?.title || "") as string,
      key: element.name?.toString() || element.path,
      icon: renderIcon(element.meta?.icon),
      path: subPath(node?.path || "", element.path)
    }
    array.push(item)
    traversal(element as RouteRecordRawEx, item)
  }
}
// 遍历路由节点，仅把layout路由下的节点生成菜单
router.options.routes.find(x => x.name === 'layout')?.children?.forEach(el => generateNode(menus.value, el as RouteRecordRawEx))

// 根据路由路径确定当前选中菜单
const current = ref<string[]>([router.currentRoute.value.name?.toString() || ""]);

// 当前需要展开的菜单节点
const openKeys = ref<string[]>()

// 查找当前选中的菜单树路径
const findKeys = (node: MenuType): MenuType[] => {
  if (node.key === current.value[0]) {
    return [node]
  }
  if (!!node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const paths = findKeys(node.children[i])
      if (paths.length > 0) {
        paths.unshift(node)
        return paths
      }
    }
  }
  return []
}
menus.value.forEach(item => {
  let paths = findKeys(item)
  if (paths.length > 0 && paths.pop()) {
    openKeys.value = paths.map(x => x.key)
  }
})
// 跳转
const jump = (items: any) => {
  router.push({ path: items.item.path })
}
</script>
<style scoped lang='less'>
.header {
  width: 100vw;
  height: var(--tp-header-height);
  display: flex;
  align-items: center;
  box-shadow: var(--tp-box-shadow);
  background-color: #ffffff;
  position: fixed;
  z-index: 998;

  &-logo {
    width: var(--tp-menu-width);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }

  &-main {
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: right;
    align-items: center;
    padding: 0 var(--tp-padding);

    &__sign-info {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }
}

.container {
  position: relative;
  display: flex;
  width: 100vw;
  margin-top: var(--tp-header-height);
  height: calc(100vh - var(--tp-header-height));

  .menu {
    height: 100%;
    width: var(--tp-menu-width);
  }

  .main {
    flex: 1;
    padding: var(--tp-padding);
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>