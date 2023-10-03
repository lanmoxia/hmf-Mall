<template>
	<view class="resale-wrapper">
		<custom-head-bar :headLogo="headLogo" :headTitle="headTitle" :isBgColor="isBgColor" id="head-bar"></custom-head-bar>

		<scroll-view class="scroll-box" scroll-y @scroll="handleScroll" scroll-with-animation>

			<view class="container">
				<view class="search-bar-box">
					<navigator class="sear-bar" url="/pages/search/search">
						<view></view>
						请输入搜索内容
						<image class="search-icon" src="../../static/icons/search.png"></image>
					</navigator>
				</view>

				<u-sticky z-index="6">
					<view class="nav-bar">
						<nav-bar :navlist="navlist"></nav-bar>
					</view>
				</u-sticky>

				<view class="listings-item">
					<listings-item v-for="item in itemList" :key="item.id" :listingsItem="item"></listings-item>
				</view>


			</view>

		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				headLogo: '../../static/icons/logo.png',
				headTitle: '二手房源',
				isBgColor: false,
				navlist: [{
					id: 1,
					name: '一号院'
				}, {
					id: 2,
					name: '二号院'
				}, {
					id: 3,
					name: '三号院'
				}, {
					id: 4,
					name: '四号院'
				}, {
					id: 5,
					name: '五号院'
				}, {
					id: 6,
					name: '六号院'
				}, {
					id: 7,
					name: '十号院'
				}, {
					id: 8,
					name: '十五号院'
				}, {
					id: 9,
					name: '十六号院'
				}, {
					id: 10,
					name: '十七号院'
				}],
				itemList: [{
					id: 1,
					image: "../../static/icons/home.jpg",
					title: "次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
					sku: {
						size: "3室1厅",
						area: "87.64m²",
						orientation: "南"
					},
					originalPrice: "134万",
					averagePrice: "15,290元/平"
				}, {
					id: 2,
					image: "../../static/icons/home.jpg",
					title: "次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
					sku: {
						size: "3室1厅",
						area: "87.64m²",
						orientation: "南"
					},
					originalPrice: "134万",
					averagePrice: "15,290元/平"
				}, {
					id: 3,
					image: "../../static/icons/home.jpg",
					title: "次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
					sku: {
						size: "3室1厅",
						area: "87.64m²",
						orientation: "南"
					},
					originalPrice: "134万",
					averagePrice: "15,290元/平"
				}, {
					id: 4,
					image: "../../static/icons/home.jpg",
					title: "次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
					sku: {
						size: "3室1厅",
						area: "87.64m²",
						orientation: "南"
					},
					originalPrice: "134万",
					averagePrice: "15,290元/平"
				}, {
					id: 5,
					image: "../../static/icons/home.jpg",
					title: "次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
					sku: {
						size: "3室1厅",
						area: "87.64m²",
						orientation: "南"
					},
					originalPrice: "134万",
					averagePrice: "15,290元/平"
				}],
			}
		},
		onLoad() {

		},
		methods: {
			handleScroll(e) {
				const scrollTop = e.detail.scrollTop
				scrollTop > 20 ? this.isBgColor = true : this.isBgColor = false
			},
			click(item) {
				console.log('item', item)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.resale-wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f6f6f6;
		overflow: hidden;
		z-index: 999;

		.scroll-box {
			height: 100%;

			.container {
				display: flex;
				flex-direction: column;
				justify-content: center;

				.listings-item {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					padding: 30rpx 30rpx 200rpx 30rpx;

					.item {}
				}

				.search-bar-box {
					padding: 30rpx 60rpx 0 60rpx;

					.sear-bar {
						font-size: 32rpx;
						color: $text-font-color-3;
						background-color: white;
						padding: 16rpx 20rpx;
						border-radius: 32rpx;
						border: 1px solid transparent;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.search-icon {
							width: 45rpx;
							height: 45rpx;
							margin-left: 10rpx;
						}
					}
				}
			}
		}
	}
</style>