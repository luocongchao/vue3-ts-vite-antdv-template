<template>
    <div class="icon-list">
        <div class="icon-list__item" @click="copy(item)" :key="item" v-for="item in keys">
            <svg-icon :name="item"></svg-icon>
            <div class="icon-list__item-info">{{ item }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMessage } from '@/hooks/useMessage';
import { copyToClipboard } from '@/utils/tools'
let svgs = import.meta.glob('@/assets/svg/*')
let keys = Object.keys(svgs).map(x => x.replace('/src/assets/svg/', '').replace('.svg', ''))
const copy = (txt: string) => {
    copyToClipboard(txt)
        .then(() => useMessage().createMessage.success('已复制名称到剪贴板'))
        .catch(() => useMessage().createMessage.warning('该浏览器不支持点击复制到剪贴板'))
}
</script>
<style scoped lang='less'>
.icon-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    row-gap: var(--tp-padding);
    column-gap: var(--tp-padding);
    padding: 8px;
    height: auto;
    overflow: hidden;
    overflow-y: auto;


    &__item {
        display: flex;
        height: 120px;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-shadow: 0px 0px 8px rgba(7, 7, 7, 0.234);
        border-radius: 4px;
        cursor: pointer;
        font-size: 32px;
        color: #3a3a3a;

        &:hover {
            background-color: #e6f4ff;
        }

        &-info {
            margin-top: 8px;
            font-size: 14px;
        }
    }
}
</style>