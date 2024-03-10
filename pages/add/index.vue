<template>

	<u-sticky offset-top="0">
		<u-swiper :list="list" previousMargin="50" nextMargin="50" circular :autoplay="true" radius="8"
			bgColor="#ffffff" height="300rpx">
		</u-swiper>
	</u-sticky>
	<view style="padding-top: 40px;">
	</view>
	<view class="container">
		<dishes-card v-for="(data, index) in datas" :key="index" :data="data" />
		<view class="space">
		</view>
	</view>
	

	<view class="submit">
		<u-button shape="circle" type="primary" text="提交" @click="confirm"></u-button>
	</view>
	
	<u-popup :show="show" mode="bottom">
		<view class="confirm">
			<view class="text">
				<view class="label">
					菜品清单如下，请确认
				</view>
				<dishes-info v-for="(data, index) in showDatas" :key="index" :data="data"></dishes-info>
			</view>
			<view class="action">
				<up-button type="primary" text="提交" @click="submit"></up-button>
				<view style="padding-top: 4px;">
				</view>
				<up-button type="error" text="取消" @click="show = false"></up-button>
			</view>

		</view>
	</u-popup>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import { onShow } from '@dcloudio/uni-app';

	import dishesCard from '@/component/dishes-card.vue';
	import dishesInfo from '@/component/dishes-info.vue';

	const datas = ref([]);

	const getData = () => {
		uni.request({
			url: 'https://ljguo.top/api/get',
			method: 'GET',
			success: (res) => {
				let rawData = res.data.data;
				rawData.forEach((data) => {
					data.count = 0;
				})
				datas.value = rawData;
				datas.value.forEach((data) => {
					list.value.push(data.image);
				});
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
	

	
	onShow(() => {
		getData();
	})


	const show = ref(false);



	const showDatas = ref([]);


	const list = ref([]);
	
	const confirm = () => {
		showDatas.value = [];
		show.value = true;
		datas.value.map((data) => {
			if(data.count > 0) {
				showDatas.value.push({
					id: data.id,
					name: data.name,
					count: data.count
				})
			}
		})
	}

	const submit = () => {
		// 找到点的菜品
		// 存入 redis
		saveCart({
			data: JSON.stringify(showDatas.value)
		});
		
		uni.showToast({
			title: '提交成功',
			duration: 1000
		})
		show.value = false;

		showDatas.value = [];
		
		getData();
		
		// 入库
	}
</script>

<style lang="scss" scoped>
	.container {
		// margin-top: 20px;
		width: 100%;
	}

	.submit {
		position: fixed;
		right: 20px;
		bottom: 20px;
		width: 150rpx;
	}
	
	.confirm {
		position: relative;
		width: 100%;
		// min-height: 150px;
		.text {
			padding-bottom: 30px;
			// min-height: 300px;
		}
	}
	
	.action {
		// margin-top: 50px;
		// position: absolute;
		width: 100%;
		// bottom: 0;
	}
	
	.label {
		padding: 20px;
	}
	
	.space {
		padding-top: 80px;
	}
</style>