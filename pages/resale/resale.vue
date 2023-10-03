<template>
	<view class="resale-wrapper">
		<scroll-view class="scroll-box" scroll-y @scroll="handleScroll" scroll-with-animation>

			<u-sticky :customNavHeight="0" :zIndex="2">
				<custom-head-bar :headLogo="headLogo" :headTitle="headTitle" :isBgColor="isBgColor"
					id="head-bar"></custom-head-bar>
			</u-sticky>

			<view class="container">
				<view class="search-bar-box" id="search-bar">
					<navigator class="sear-bar" url="/pages/search/search">
						<view></view>
						<text class="placeholder-text">请输入搜索内容</text>
						<image class="search-icon" src="../../static/icons/search.png"></image>
					</navigator>
				</view>

				<u-sticky v-if="headHeight" :customNavHeight="headHeight" :zIndex="1">
					<view class="listings-nav">
						<scroll-view class="scroll-view-nav" scroll-x>
							<view v-for="(item,index) in itemList" :key="item.id" class="nav-title"
								:class="{ 'active': index === selectedIndex  }" @tap="selectItem(index)">
								{{item.name}}
							</view>
						</scroll-view>
					</view>
				</u-sticky>

				<view class="listings-item">
					<listings-item :listingsItem="itemList[selectedIndex].children"></listings-item>
				</view>

			</view>

		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				headHeight: 0,
				selectedIndex: 0,
				headLogo: '../../static/icons/logo.png',
				headTitle: '二手房源',
				isBgColor: false,
				itemList: [{
						id: 1,
						name: "一号院",
						children: [{
								id: 11,
								name: "一号院1 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home1.jpg"
							},
							{
								id: 12,
								name: "一号院2 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home1.jpg"
							},
							{
								id: 13,
								name: "一号院3 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home1.jpg"
							},
							{
								id: 14,
								name: "一号院4 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home1.jpg"
							},
							{
								id: 15,
								name: "一号院5 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home1.jpg"
							},
							{
								id: 16,
								name: "一号院6 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home1.jpg"
							}
						]
					},
					{
						id: 2,
						name: "二号院",
						children: [{
								id: 21,
								name: "二号院1 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home2.jpg"
							},
							{
								id: 22,
								name: "二号院2 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
								sku: {
									size: "3室1厅",
									area: "87.64m²",
									orientation: "南"
								},
								originalPrice: "134万",
								averagePrice: "15,290元/平",
								thumb: "../../static/home2.jpg"
							}
						]
					},
					{
						id: 3,
						name: "三号院",
						children: [{
							id: 31,
							name: "三号院1 次新小区 地铁2号线 南北通透 双阳台 毛坯大甩卖 毛坯大甩卖",
							sku: {
								size: "3室1厅",
								area: "87.64m²",
								orientation: "南"
							},
							originalPrice: "134万",
							averagePrice: "15,290元/平",
							thumb: "../../static/home3.jpg",
						}]
					},
					{
						id: 4,
						name: "四号院"
					},
					{
						id: 5,
						name: "五号院"
					},
					{
						id: 6,
						name: "六号院"
					},
					{
						id: 7,
						name: "七号院"
					}
				]
			}
		},
		onLoad() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.getHeight()
				}, 100)
			})
		},
		methods: {

			getHeight() {
				uni.createSelectorQuery().in(this)
					.select("#head-bar")
					.boundingClientRect(rect => {
						this.headHeight = rect.height
					}).exec()
			},

			selectItem(index) {
				this.selectedIndex = index
			},
			handleScroll(e) {
				const scrollTop = e.detail.scrollTop
				scrollTop > 20 ? this.isBgColor = true : this.isBgColor = false
			},
			click(item) {
				console.log('item', item)
			}
		}
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
				padding: 0 30rpx;

				.listings-nav {
					height: 100%;
					background-color: #f6f6f6;
					box-shadow: 0px 10px 16px -14px rgba(0, 0, 0, 0.1);
					margin-bottom: 30rpx;

					.scroll-view-nav {
						display: flex;
						height: 100%;
						white-space: nowrap;
						padding: 40rpx 0 40rpx 0;

						.nav-title {
							display: inline-block;
							font-size: 32rpx;
							font-weight: 600;
							padding: 16rpx 28rpx;
							margin-right: 16rpx;
							border-radius: 24rpx;
							background-color: #ffffff;
							color: #1d212a;

							&.active {
								background-color: #e5e9f5;
								color: #3072f6;
							}
						}
					}
				}

				.search-bar-box {
					padding-top: 60rpx;
					display: flex;
					justify-content: center;

					.sear-bar {
						width: 70%;
						font-size: 32rpx;
						color: #2a212a;
						background-color: white;
						padding: 16rpx 20rpx;
						border-radius: 32rpx;
						border: 1px solid transparent;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.placeholder-text {
							color: #969696;
						}

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