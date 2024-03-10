<template>
	<u-loading-page loading-mode="semicircle" loading-text="加载中..." :loading="loading"></u-loading-page>
	
	<dishes-info v-for="(data, index) in dishesData" :key="index" :data="data"></dishes-info>
	
	<view class="submit">
		<u-button shape="circle" type="primary" text="提交" @click="submit"></u-button>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import dishesInfo from '@/component/dishes-info.vue';
	const dishesData = ref([]);
	
	const loading = ref(true);
	onShow(() => {
		loading.value = true;
	    getCart();
		setTimeout(() => {
			loading.value = false;	
		}, 1000);

	})
	
	const getCart = () => {
		uni.request({
			url: 'https://ljguo.top/api/get_cart',
			method: 'GET',
			success: (res) => {
				dishesData.value = res.data.data;
			},
			fail: (err) => {
				console.log(err);
			}
		});
	}
	
	const saveCart = (data) => {
		uni.request({
			url: 'https://ljguo.top/api/save_cart',
			method: 'POST',
			data: data,
			success: (res) => {
				console.log(res.data);
			},
			fail: (err) => {
				console.log(err);
			}
		});
	}
	
	const submit = () => {
		// 通知小二备菜
		uni.request({
			url: 'https://ljguo.top/api/send_email',
			method: 'GET',
			success: (res) => {
				// 存入数据库
				
				// 提示
				uni.showToast({
					title: '小二备餐去咯',
					duration: 1000
				});
			},
			fail: (err) => {
				console.log(err);
			}
		});
		
		saveCart({
			data: null
		});
		
		getCart();
		

	}
</script>

<style scoped>
	.submit {
		position: fixed;
		right: 20px;
		bottom: 80px;
		width: 150rpx;
	}
</style>