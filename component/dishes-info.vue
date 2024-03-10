<template>
	<view class="container">
		<view class="name">
			{{ data.name }}
		</view>
		<view class="count">
			{{ data.count }}
		</view>
	</view>
</template>

<script setup>
	defineProps(['data'])
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
	.name {
		font-size: 18px;
		margin-left: 20px;
	}
	.count {
		font-size: 18px;
		margin-right: 20px;
	}
	.count::before {
		content: 'x';
		font-size: 18px;
		margin-right: 5px;
	}
</style>