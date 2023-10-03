<template>
	<view class="custom-head" :class="{'active-bg-olor': isBgColor}"
		:style="{height: (statusBarHeight + titleBarHeight) + 'px'}">
		<view class="container">
			<view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="service" :style="{height: titleBarHeight + 'px'}">
				<image class="logo-icon" :src="headLogo"></image>
				<navigator class="title-text">
					{{headTitle}}
				</navigator>
				<view :style="{width: menuBtnWidth + 'px'}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-head-bar",
		props: ['headTitle', 'headLogo', 'isBgColor'],
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 0,
				menuBtnWidth: 0
			}
		},

		mounted() {
			// 设备信息
			let systemInfo = uni.getSystemInfoSync()

			// 状态栏高度
			this.statusBarHeight = systemInfo.statusBarHeight || 20

			// #ifdef MP-WEIXIN
			// 胶囊按钮信息
			let menuBtnInfo = uni.getMenuButtonBoundingClientRect()

			this.menuBtnWidth = menuBtnInfo.width
			// 胶囊 + 上下空袭高度
			this.titleBarHeight = menuBtnInfo.height + (menuBtnInfo.top - this.statusBarHeight) * 2
			// #endif

			// #ifndef MP-WEIXIN
			this.titleBarHeight = 40
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.custom-head {
		overflow: hidden;
		position: relative;
		background-image: linear-gradient(to top, #f6f6f6 0%, #aacdf7 100%);

		&.active-bg-olor {
			transition: all 0.5s ease;
			background: white;
			box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.2);
		}

		.container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			margin-bottom: 20rpx;

			.service {
				padding-left: 30rpx;
				@include flex-box-set(between);
				color: #1d212a;

				.logo-icon {
					width: 35rpx;
					height: 35rpx;
					padding: 10rpx;
					border: 1px solid #1d212a;
					border-radius: 50%;
				}

				.title-text {
					font-size: 40rpx;
					font-weight: bold;
					@include flex-box-set(start);
				}
			}
		}
	}
</style>