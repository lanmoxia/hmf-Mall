<template>
	<view class="item-info" @tap="showDetail">

		<view class="item-pic">
			<image class="img" :src="searchItem.picpath[0]" model="aspectFill"></image>
		</view>
		<view class="item-texts">
			<view class="item-title">{{searchItem.house_name}}</view>
			<text class="item-sku">
				{{searchItem.house_types}} | {{searchItem.area}}m² | {{mapText(searchItem.orientation,"orientation")}}
			</text>
			<view class="price-information">
				<view class="current-price">{{searchItem.rent}}元</view>
				<block v-if="parseInt(searchItem.rent) !== parseInt(searchItem.original_rent)">
					<uni-icons v-if="parseInt(searchItem.rent) < parseInt(searchItem.original_rent)" type="arrow-up" size="18"
						color="#d53c3c"></uni-icons>
					<uni-icons v-else-if="searchItem.original_rent" type="arrow-down" size="18" color="#03a66d"></uni-icons>
				</block>
				<view v-if="searchItem.original_rent && parseInt(searchItem.rent) !== parseInt(searchItem.original_rent)"
					class="average-price">
					{{searchItem.original_rent}}
				</view>
				<view v-else class="average-price">价格平稳</view>
				<view class="average-price dian">•</view>
				<view class="average-price">{{mapText(searchItem.key, "key")}}</view>
			</view>
			<view class="community-box">
				<view class="community-title">{{mapText(searchItem.viewing_time, "viewingTime")}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	import {
		mapText
	} from "@/utils/mapper.js"

	export default {
		name: "rental-searchitem",
		props: {
			searchItem: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			mapText(value, attribute) {
				return mapText(value, attribute)
			},
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
				font-size: 35rpx;
				font-weight: bold;
				@include ellipsis(2);
			}

			.item-sku {
				font-size: 28rpx;
			}

			.price-information {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				.current-price {
					font-size: 35rpx;
					font-weight: 600;
					color: #d53c3c;
					margin-right: 18rpx;
				}

				.average-price {
					color: #9399a5;
					font-size: 26rpx;

					&.dian {
						margin: 0 10rpx;
					}
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