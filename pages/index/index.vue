<template>
  <view class="content">
    <view class="title">
      {{ title }}
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const title = ref('欢迎光临欣味轩');

onLoad(() => {
  console.log('hello');
});

</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 设置为视口高度 */
}

.title {
  align-self: center;
  font-size: 30px;
  font-weight: 700;
  font-family: 'KaiTi';
}

</style>
