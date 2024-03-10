<template>
	<view class="info">
		<view class="avatar">
			<up-avatar :text="username" randomBgColor size="80"></up-avatar>			
		</view>
		<view class="text">
			登录 / 注册
		</view>
	</view>
	<u-cell-group>
		<u-cell
		    size="large"
		    title="购物车"
		    isLinkt
			url="/pages/cart/index"
			:isLink="true"
		>
		<template #icon>
			<u-icon size="24" name="shopping-cart"></u-icon>
		</template>
		</u-cell>
		<u-cell
		    size="large"
		    title="增加新菜品"
			isLinkt
			url="/pages/save/index"
			:isLink="true"
		>
		<template #icon>
			<u-icon size="24" name="plus"></u-icon>
		</template>		
		</u-cell>
		<u-cell
		    size="large"
		    title="历史订单"
			isLinkt
			url="/pages/orders/index"
			:isLink="true"
		>
		<template #icon>
			<u-icon size="24" name="file-text"></u-icon>
		</template>		
		</u-cell>
	</u-cell-group>
</template>

<script setup>
	const username = '欣味轩'
</script>

<style scoped lang="scss">
	.info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100px;
		background-color: #fff;
		.avatar {
			padding: 20px;
		}
		.text {
			font-size: 18px;
			font-weight: 700;	
		}
	}
</style>

