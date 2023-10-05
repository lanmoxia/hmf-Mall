<template>
	<view class="item-info" @tap="showDetail">
		<view class="item-pic">
			<image class="img" src="../../static/home1.jpg" model="aspectFill"></image>
		</view>
		<view class="item-texts">
			<view class="item-title">次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖</view>
			<text class="item-sku">
				3室1厅 | 87.64m² | 南
			</text>
			<view class="price-information">
				<text class="current-price">134万</text>
				<text class="average-price">15,290元/平</text>
			</view>
			<view class="community-box">
				<view class="community-title">满五唯一</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		name: "search-item",
		methods: {
			...mapMutations(["SET_DETAIL_STATE"]),
			showDetail() {
				this.SET_DETAIL_STATE(true)
			}
		}
	}
</script>

<style lang="scss">
	.item-info {
		width: 100%;
		display: flex;
		padding-bottom: 20rpx;
		margin-bottom: 30rpx;
		box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.1);

		.item-pic {
			width: 180rpx;
			height: 180rpx;
			border-radius: 20rpx;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.item-texts {
			flex: 1;
			padding-left: 20rpx;
			position: relative;

			.item-title {
				font-size: 34rpx;
				font-weight: bold;
				@include ellipsis();
			}

			.item-sku {
				font-size: 26rpx;
			}

			.price-information {

				.current-price {
					font-size: 28rpx;
					font-weight: 600;
					color: #d53c3c;
					margin-right: 10rpx;
				}

				.average-price {
					color: #a3a1a2;
					font-size: 26rpx;
				}
			}

			.community-box {
				position: absolute;
				right: 0;
				bottom: 0;
				border-radius: 8rpx;

				.community-title {
					line-height: 45rpx;
					padding: 0 16rpx;
					border-radius: 8rpx;
					background: $brand-theme-color;
					font-size: 28rpx;
					color: #fff;
				}
			}
		}

	}
</style>