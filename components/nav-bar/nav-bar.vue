<template>
	<view class="wrapper">
		<scroll-view class="nav-box" scroll-x>
			<view class="nav-item" v-for="(item, index) in navlist" :key="item.id"
				:class="{ 'active': index === selectedIndex }" @tap="selectItem(index)">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "nav-bar",
		data() {
			return {
				selectedIndex: 0
			}
		},
		props: ['navlist'],
		methods: {
			selectItem(index) {
				this.selectedIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100%;
		padding: 0 30rpx;
		background-color: #f6f6f6;
		box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.1);

		.nav-box {
			display: flex;
			height: 100%;
			white-space: nowrap;
			padding: 40rpx 0 30rpx 0;

			.nav-item {
				display: inline-block;
				font-size: 32rpx;
				font-weight: 600;
				padding: 16rpx 28rpx;
				margin-right: 16rpx;
				border-radius: 24rpx;
				background-color: #ffffff;
				color: #676767;

				&.active {
					background-color: #e5e9f5;
					color: #3072f6;
				}
			}
		}
	}
</style>