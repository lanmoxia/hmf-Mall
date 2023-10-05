<template>
	<view class="item-wrapper" @click="showDetail">

		<view class="item-info" v-for="item in listingsItem" :key="item.id">
			<view class="item-pic">
				<image class="img" :src="item.thumb" model="aspectFit"></image>
			</view>
			<view class="item-texts">
				<view class="item-title">{{item.name}}</view>
				<text class="item-sku">
					{{item.sku.size }} | {{item.sku.area}} | {{item.sku.orientation}}
				</text>
				<view class="price-information">
					<text class="current-price">{{item.originalPrice}}</text>
					<text class="average-price">{{item.averagePrice}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		name: "listings-item",
		props: {
			listingsItem: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			...mapMutations(["SET_DETAIL_STATE"]),
			showDetail() {
				this.SET_DETAIL_STATE(true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;


		.item-info {
			color: #272526;
			background-color: white;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.1);
			width: 340rpx;
			height: auto;
			overflow: hidden;
			margin-bottom: 30rpx;

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
					line-height: 36rpx;
					color: #1d212a;
					@include ellipsis(2);
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
						color: #9399a5;
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>