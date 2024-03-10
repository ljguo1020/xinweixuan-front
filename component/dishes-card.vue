<template>
	<view class="card">
		<up-image class="food-image" :show-loading="true" :src="data.image" width="80px" height="80px"
			radius="10"></up-image>
		<view class="food-details">
			<text class="food-name">{{ data.name }}</text> <br>
			<text class="food-description">{{ data.description }}</text> <br>
			<text class="food-price">¥ {{ data.price }}</text>
			<view class="add">
				<num-box :count="data.count" @plus="add" @minus="minus"></num-box>
				<u-toast ref="msgRef"></u-toast>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['data'])
	import {
		ref
	} from 'vue';
	import numBox from '@/component/num-box.vue'
	const msgRef = ref();
	const add = () => {
		if (props.data.count == 3) {
			msgRef.value.show({
				type: 'success',
				message: "点这么多，吃得完吗?",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
			})
			return;
		}
		props.data.count++;
	}

	const minus = () => {
		if (props.data.count == 0) {
			msgRef.value.show({
				type: 'error',
				message: "你还吃不吃了?",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
			})
			return;
		}
		props.data.count--;
	}
</script>

<style scoped>
	.card {
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: auto;
		width: 85%;
		padding: 10px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-top: 10px;
	}

	.food-image {
		border-radius: 8px;
	}

	.food-details {
		flex: 1;
		margin-left: 20px;
	}

	.food-name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.food-description {
		font-size: 14px;
		color: #666666;
	}

	.food-price {
		font-size: 16px;
		color: #ff5a5f;
		font-weight: bold;
	}

	.add {
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
</style>