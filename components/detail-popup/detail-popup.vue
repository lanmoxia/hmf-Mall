<template>
	<view class="listings-detail-wrapper">
		<u-popup :show="isDetail" closeable closeOnClickOverlay round="10" mode="bottom" @close="onClose">
			<view class="listings-detail">
				<view class="layout-spacer-tag"></view>
				<view class="container">
					<scroll-view class="scroll-view" scroll-y>
						<view class="thumb">
							<image class="img" src="../../static/home1.jpg" mode="aspectFill"></image>
						</view>
						<view class="listings-texts">
							<view class="title">次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖</view>
							<view class="price-information">
								<view class="current-price">125万</view>
								<view class="average-price">15,290元/平</view>
							</view>
						</view>

						<view class="detail">
							<view class="text">
								<view class="title">商品描述</view>
								<view class="description">
									这里是房源属性
									<!-- <rich-text :nodes="detailData.description"></rich-text> -->
								</view>
							</view>

							<view class="picList">
								<view v-for="(item,index) in 5" :key="index">
									<image class="img" src="../../static/home1.jpg" mode="widthFix"></image>
								</view>
							</view>
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
	export default {
		name: "detail-popup",
		computed: {
			...mapGetters(["isDetail"])
		},
		methods: {
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
					padding: 0 30rpx 20rpx 30rpx;

					.thumb {
						width: 690rpx;
						height: 690rpx;

						.img {
							width: 100%;
							height: 100%;
						}
					}

					.listings-texts {
						padding: 20rpx 0;
						border-bottom: 1px solid $border-color-light;

						.title {
							font-size: 40rpx;
							font-weight: bold;
						}

						.price-information {
							display: flex;
							align-items: center;
							padding-top: 20rpx;

							.current-price {
								font-size: 46rpx;
								font-weight: bold;
								color: $brand-theme-color;
							}

							.average-price {
								font-size: 28rpx;
								color: $text-font-color-3;
								font-weight: bold;
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



					.detail {
						.text {
							padding: 20rpx 0;

							.title {
								font-size: 32rpx;
								font-weight: bold;
							}

							.description {
								padding: 20rpx 0;
								line-height: 1.7em;
							}
						}

						.picList {
							.img {
								width: 100%;
								margin-bottom: 30rpx;
							}
						}
					}
				}
			}
		}
	}
</style>