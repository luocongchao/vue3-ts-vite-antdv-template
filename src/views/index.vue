<template>
    <div>{{ data.title }}</div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { reactive } from 'vue'
const data = reactive({
    title: 'current path: ' + router.currentRoute.value.fullPath
})
</script>
<style scoped lang='less'></style>
