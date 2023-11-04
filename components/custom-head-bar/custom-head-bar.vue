<template>
	<view class="custom-head" :style="{height: (statusBarHeight + titleBarHeight) + 'px'}">
		<view class="container">
			<view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="service" :style="{height: titleBarHeight + 'px'}">
				<image class="logo-icon" :src="headLogo"></image>
				<navigator class="title-text">
					{{headTitle}}
				</navigator>
				<view class="placeholder-tag"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	export default {
		name: "custom-head-bar",
		props: ['headTitle', 'headLogo', 'isBgColor'],
		computed: {
			...mapGetters(["statusBarHeight", "titleBarHeight", "menuWidth"])
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
				padding: 0 30rpx 0 30rpx;
				@include flex-box-set(between);
				color: #1d212a;

				.placeholder-tag {
					width: 52rpx;
					height: 52rpx;
					padding: 10rpx;
					border: 1px solid transparent;
					border-radius: 50%;
				}

				.logo-icon {
					width: 40rpx;
					height: 40rpx;
					padding: 6rpx;
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