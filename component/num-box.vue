<template>
	<view class="box">
		<view class="minus" @click="$emit('minus')">
			<u-icon name="minus-circle" color="#2979ff" size="24"></u-icon>
		</view>
		<view class="value">
			{{ count }}
		</view>
		<view class="plus" @click="$emit('plus')">
			<u-icon name="plus-circle" color="#2979ff" size="24"></u-icon>
		</view>
	</view>
</template>

<script setup>
	defineProps(['count']);
</script>

<style scoped>
	.box {
		width: 140rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.value {
		font-size: 16px;
	}
	
</style>