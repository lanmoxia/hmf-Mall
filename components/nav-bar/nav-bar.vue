<template>
	<view class="wrapper">
		<scroll-view class="nav-box" scroll-x>
			<view class="nav-item"  >
				{{navTitle}}
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
		props: {
			navTitle: {
				type: String,
				require: true
			}
		},
		methods: {
			selectItem(index) {
				this.selectedIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listings-nav {
		height: 100%;
		padding: 0 30rpx;
		background-color: #f6f6f6;
		box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.1);

		.scroll-view-nav {
			display: flex;
			height: 100%;
			white-space: nowrap;
			padding: 40rpx 0 30rpx 0;

			.nav-title {
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