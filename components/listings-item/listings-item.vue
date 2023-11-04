<template>
	<view>
		<view class="item-wrapper">

			<view class="item-info" @click="showDetail(item._id)" v-for="item in houseList" :key="item._id">
				<view class="item-pic">
					<image class="img" :src="item.picpath[0]" model="aspectFit"></image>
				</view>

				<view v-if="isResale" class="item-texts">
					<view class="item-title">{{item.house_name}}</view>
					<text v-if="item.orientation === null" class="item-sku">
						{{sliceStr(item.house_types)}} | {{item.area}}m² | {{item.floor}}层
					</text>
					<text v-else class="item-sku">
						{{sliceStr(sliceStr(item.house_types))}} | {{item.area}}m² | {{mapText(item.orientation, "orientation")}}
					</text>
					<view class="price-information">
						<view class="current-price">{{item.total}}万</view>
						<block v-if="parseInt(item.total) !== parseInt(item.original_rent)">
							<uni-icons v-if="parseInt(item.total) < parseInt(item.original_rent)" type="arrow-up" size="18"
								color="#d53c3c"></uni-icons>
							<uni-icons v-else-if="item.original_rent" type="arrow-down" size="18" color="#03a66d"></uni-icons>
						</block>
						<view v-if="item.original_rent && parseInt(item.total) !== parseInt(item.original_rent)"
							class="average-price">
							{{item.original_rent}}
						</view>
						<view v-else class="average-price">价格平稳</view>
						<view class="average-price dian">•</view>
						<view class="average-price">{{mapText(item.key, "key")}}</view>
					</view>
				</view>


				<view v-else class="item-texts">
					<view class="item-title">{{item.house_name}}</view>
					<text v-if="item.orientation === null" class="item-sku">
						{{sliceStr(item.house_types)}} | {{item.area}}m² | {{item.floor}}层
					</text>
					<text v-else class="item-sku">
						{{sliceStr(sliceStr(item.house_types))}} | {{item.area}}m² | {{mapText(item.orientation, "orientation")}}
					</text>
					<view class="price-information">
						<view class="current-price">{{item.rent}}</view>
						<block v-if="parseInt(item.rent) !== parseInt(item.original_rent)">
							<uni-icons v-if="parseInt(item.rent) < parseInt(item.original_rent)" type="arrow-up" size="18"
								color="#d53c3c"></uni-icons>
							<uni-icons v-else-if="item.original_rent" type="arrow-down" size="18" color="#03a66d"></uni-icons>
						</block>
						<view v-if="item.original_rent && parseInt(item.rent) !== parseInt(item.original_rent)"
							class="average-price">
							{{item.original_rent}}
						</view>
						<view v-else class="average-price">价格平稳</view>
						<view class="average-price dian">•</view>
						<view class="average-price">{{mapText(item.key, "key")}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from "vuex"
	import {
		mapText
	} from "@/utils/mapper.js"

	export default {
		name: "listings-item",
		props: {
			retalHouseList: {
				type: Array,
				default: () => []
			},
			resaleHouseList: {
				type: Array,
				default: () => []
			},
			isResale: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			houseList() {
				if (this.isResale) {
					return this.resaleHouseList
				} else {
					return this.retalHouseList
				}
			}
		},
		methods: {
			sliceStr(str) {
				return str.slice(0, 4)
			},
			...mapActions(['getRentalDetailList', 'getResaleDetailList']),
			mapText(value, attribute) {
				return mapText(value, attribute)
			},
			...mapMutations(["SET_DETAIL_STATE"]),
			showDetail(id) {
				console.log(id)
				if (this.isResale) {
					this.getResaleDetailList(id)
						.then(() => {
							this.SET_DETAIL_STATE(true);
						})
						.catch(error => {
							console.error('Error:', error);
						});
				} else {
					this.getRentalDetailList(id)
						.then(() => {
							this.SET_DETAIL_STATE(true);
						})
						.catch(error => {
							console.error('Error:', error);
						});
				}
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
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.item-sku {
					font-size: 26rpx;
				}

				.price-information {
					margin-top: 10rpx;
					display: flex;
					align-items: center;

					.current-price {
						font-size: 32rpx;
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
			}
		}
	}
</style>