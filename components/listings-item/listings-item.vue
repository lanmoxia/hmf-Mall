<template>
	<view class="container">

		<view class="item-info">

			<view class="item-pic">
				<image class="img" :src="listingsItem.image" model="aspectFit"></image>
			</view>
			<view class="item-texts">
				<view class="item-title">{{listingsItem.title}}</view>
				<text class="item-sku">
					{{listingsItem.sku.size }} | {{listingsItem.sku.area}} | {{listingsItem.sku.orientation}}
				</text>
				<view class="price-information">
					<text class="current-price">{{listingsItem.originalPrice}}</text>
					<text class="average-price">{{listingsItem.averagePrice}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "listings-item",
		data() {
			return {

			}
		},
		props: ['listingsItem']
	}
</script>

<style lang="scss" scoped>
	.container {
		box-sizing: border-box;
		margin-bottom: 20rpx;

		.item-info {
			color: #272526;
			background-color: white;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.1);
			width: 340rpx;
			height: auto;
			overflow: hidden;

			.item-pic {
				width: 340rpx;
				height: 340rpx;

				.img {
					width: 100%;
					height: 100%;
					border-top-left-radius: 25rpx;
					border-top-right-radius: 25rpx;
				}
			}

			.item-texts {
				padding: 20rpx;

				.item-title {
					font-size: 30rpx;
					font-weight: 600;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}

				.item-sku {
					font-size: 26rpx;
				}

				.price-information {
					margin-top: 10rpx;

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
			}
		}
	}
</style>