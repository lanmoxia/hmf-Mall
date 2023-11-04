<template>
	<view class="listings-detail-wrapper" v-if="houseDetailList">
		<u-popup :show="isDetail" bgColor="white" closeable closeOnClickOverlay round="10" mode="bottom" @close="onClose">
			<view class="listings-detail">
				<view class="layout-spacer-tag"></view>
				<view class="container">

					<scroll-view class="scroll-view" scroll-y>

						<view class="infor">
							<view class="swiper-wripper">
								<u-swiper :list="houseDetailList.picpath" img-mode="aspectFit" model="number" :height="300"
									:border-radius="20" bg-color="#fff"></u-swiper>
							</view>
							<view class="listings-texts">
								<view class="title">{{houseDetailList.house_name}}</view>
								<view class="price-information">
									<view class="current-price">
										<text class="left-text">{{houseDetailList.total}}</text>
										<text class="right-text">万</text>
										<text class="average-Price">{{averagePrice}}元/m²</text>
										<text class="average-price">（ {{houseDetailList.listing_entrants}} ）</text>
									</view>
								</view>
							</view>
							<view class="house-description">
								<view class="description">
									<text class="top">{{houseDetailList.house_types}}</text>
									<text class="down">户型</text>
								</view>
								<view class="description">
									<text class="top">{{houseDetailList.area}}m²</text>
									<text class="down">建筑面积</text>
								</view>
								<view class="description" v-if="houseDetailList.orientation">
									<text class="top">{{mapText(houseDetailList.orientation, "orientation")}}</text>
									<text class="down">朝向</text>
								</view>
								<view class="description">
									<text v-if="houseDetailList.total_floor"
										class="top">{{houseDetailList.floor}}/{{houseDetailList.total_floor}}</text>
									<text v-else class="top">{{houseDetailList.floor}}</text>
									<text class="down">楼层</text>
								</view>
							</view>

							<view class="owner-information">
								<u-collapse>
									<u-collapse-item :border="false" title="业主信息">
										<u-cell-group :border="false">
											<u-cell :border="false" align="left" title="业主姓名" :value="houseDetailList.name"></u-cell>
											<u-cell :name="houseDetailList.tel" @click="callPhone" :border="false" title="业主电话"
												:value="houseDetailList.tel"></u-cell>
										</u-cell-group>
									</u-collapse-item>
								</u-collapse>
							</view>
						</view>

						<view class="picture-list">
							<block v-if="houseDetailList  && houseDetailList.picpath">
								<view v-for="(item,index) in houseDetailList.picpath" :key="index">
									<image class="img" :src="item" mode="widthFix"></image>
								</view>
							</block>

						</view>

					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from "vuex"
	import {
		mapText
	} from "@/utils/mapper.js"

	export default {
		name: "resale-detailpopup",
		computed: {
			...mapGetters(["isDetail", "houseDetailList"]),
			averagePrice() {
				const total = parseInt(this.houseDetailList.total) * 10000
				const area = parseInt(this.houseDetailList.area)
				return parseInt(total / area)
			}
		},
		methods: {
			callPhone(e) {
				let phone = this.houseDetailList.tel
				uni.makePhoneCall({
					phoneNumber: phone,
					sucess: function(e) {
						console.log(e)
					},
					fail: function(e) {
						console.log(e)
					}
				})
			},

			mapText(value, attribute) {
				return mapText(value, attribute)
			},
			...mapMutations(["SET_DETAIL_STATE"]),
			onClose() {
				this.SET_DETAIL_STATE(false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listings-detail-wrapper {

		.listings-detail {
			height: 85vh;

			.layout-spacer-tag {
				height: 80rpx;
				width: 100%;
			}

			.container {
				height: 100%;

				.scroll-view {
					height: 100%;
					overflow: hidden;

					.infor {
						background-color: white;
						border-radius: 20rpx;

						.swiper-wripper {
							padding: 0 20rpx;
						}

						.listings-texts {
							margin: 20rpx 20rpx;

							.title {
								font-size: 40rpx;
								font-weight: bold;
								@include ellipsis(2)
							}

							.price-information {
								display: flex;
								align-items: center;
								padding-top: 20rpx;
								color: $brand-theme-color-aux;

								.current-price {

									.left-text {
										font-size: 50rpx;
										font-weight: bold;
										margin-right: 10rpx;
									}

									.right-text {
										font-size: 30rpx;
										margin-right: 16rpx;
									}
								}

								.average-Price {
									font-size: 30rpx;
									color: #303133;
								}

								.average-price {
									font-size: 30rpx;
									color: #717171;
									margin-left: 10rpx;
								}

								.discount {
									border: 1px solid $brand-theme-color;
									color: $brand-theme-color;
									font-size: 22rpx;
									padding: 2rpx 20rpx;
									margin-left: 10rpx;
									border-radius: 8rpx;
								}
							}
						}

						.house-description {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 20rpx 20rpx 20rpx;

							.description {
								display: flex;
								flex-direction: column;
								align-items: flex-start;


								.top {
									font-size: 32rpx;
									font-weight: bold;
								}

								.down {
									font-size: 28rpx;
									color: #717171;
								}
							}
						}

						.house-other-description {
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							padding-bottom: 30rpx;
							margin-bottom: 20rpx;

							.description-imte {
								margin-left: 20rpx;
								padding: 5rpx 10rpx;
								color: #444444;
								background-color: #f7f7f7;
								border-radius: 10rpx;
							}
						}

					}

					.household-electrical {
						padding: 20rpx;
						display: flex;
						flex-direction: column;
						background-color: white;

						.title {
							font-size: 40rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
							margin-top: 10rpx;
						}

						.content {
							display: flex;
							align-items: center;
							flex-wrap: wrap;

							.item {
								border: 1px solid #f2f3f6;
								padding: 20rpx;
								border-radius: 10rpx;
								margin-right: 16rpx;
								margin-top: 16rpx;
								display: flex;
								flex-direction: column;
								align-items: center;

								.texts {

									.text {
										display: inline-block;
										margin-top: 10rpx;
									}
								}
							}
						}
					}

					.picture-list {
						margin-bottom: 100rpx;
						background-color: white;

						.img {
							width: 100%;
						}

						.nomore {
							color: #a7a7a7;
							text-align: center;
							margin-top: 20rpx;
						}
					}

				}
			}
		}
	}
</style>