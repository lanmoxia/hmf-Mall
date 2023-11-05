<template>
	<view class="resale-wrapper">
		<u-sticky :customNavHeight="0" :zIndex="2">
			<custom-head-bar headLogo="../../static/icons/logo2.png" headTitle="租赁房源" :isBgColor="isBgColor"
				id="head-bar"></custom-head-bar>
		</u-sticky>
		<scroll-view class="scroll-box" scroll-y @scroll="handleScroll" scroll-with-animation :enable-back-to-top="true"
			:refresher-enabled="true" :refresher-triggered="isRefresher" @refresherrefresh="onRefresh"
			:refresher-threshold="100" @scrolltolower="loadMore" refresher-background="#f6f6f6"
			refresher-default-style="black">

			<view class="container">

				<view class="search-bar-box" id="search-bar">
					<navigator class="sear-bar" url="/pages/search/search?type=rental">
						<view class=" placeholder-tag">
						</view>
						<text class="placeholder-text">请输入搜索内容</text>
						<image class="search-icon" src="../../static/icons/search.png"></image>
					</navigator>
				</view>

				<u-sticky :customNavHeight="0" :zIndex="1">
					<view class="listings-nav">
						<scroll-view class="scroll-view-nav" scroll-x>
							<view v-for="item in navList" :key="item._id" class="nav-title"
								:class="{ 'active': item._id === selectesdId  }" @tap="selectItem(item._id)">
								{{item.classname}}
							</view>
						</scroll-view>
					</view>
				</u-sticky>

				<view v-if="houseList.length <= 0 || isLoading">
					<view v-if="isLoading">
						<u-loadmore status="loading" bg-color="#f6f6f6" margin-top="50%" />
					</view>
					<view v-else-if="houseList.length <= 0">
						<u-empty mode="list" marginTop="25%" icon="https://cdn.uviewui.com/uview/empty/search.png"></u-empty>
					</view>
				</view>

				<view v-else class="listings-item">
					<listings-item :retalHouseList="houseList"></listings-item>
				</view>
				<view class="loadmore" v-if="isNomore && !isLoadingMore && houseList.length > 0">
					<u-loadmore status="nomore" color="rgb(192, 196, 204)" bg-color="#f6f6f6" />
				</view>
			</view>
		</scroll-view>
		<rental-detailpopup></rental-detailpopup>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	import {
		getRentalNav,
		getRetalHouseList
	} from '@/api/request.js'
	const db = uniCloud.database()
	export default {
		name: "resale",
		data() {
			return {
				page: 1,
				size: 6,
				isNomore: false, // 是否显示没有更多文字
				isLoadingMore: false, // 是否加载更多
				hasMoreData: true, // 是否还有更多数据
				isRefresher: false, // 下拉刷新状态
				isLoading: true, // 数据加载完成之前的 loading
				selectesdId: "",
				isBgColor: false,
				navList: [],
				houseList: []
			}
		},
		onLoad() {
			this.getNav()
		},
		watch: {
			selectesdId(newVal, oldVal) {
				this.getList(newVal)
			}
		},
		methods: {
			// 上拉加载更多数据
			async loadMore() {
				uni.showLoading({
					title: '加载中'
				})

				// console.log(!this.hasMoreData)
				if (!this.hasMoreData || this.isLoadingMore) {
					return uni.hideLoading()
				}
				this.isLoadingMore = true
				this.hasMoreData = true
				this.page++
				try {
					let res = await getRetalHouseList(this.selectesdId, this.page)
					if (res.data.length > 0) {
						this.houseList = this.houseList.concat(res.data)
					} else {
						this.hasMoreData = false
						this.isLoadingMore = false
					}
				} catch (error) {
					console.error(error)
				}
				uni.hideLoading()
				this.isLoadingMore = false
				this.isNomore = true
			},
			// 触发下拉刷新
			async onRefresh() {
				if (this.isRefresher) return
				this.isRefresher = true
				this.page = 1
				await this.getNav()
				this.getList(this.selectesdId)
				this.isRefresher = false
				this.hasMoreData = true
			},
			//请求导航列表
			async getNav() {
				let res = await getRentalNav()
				this.navList = res.data
				this.selectesdId = this.selectesdId == '' ? this.navList[0]._id : this.selectesdId
			},
			// 请求房源列表
			async getList(navid) {
				this.isLoading = true
				let res = await getRetalHouseList(navid)
				this.houseList = res.data
				this.isLoading = false
			},
			// 导航 tabs 切换状态
			selectItem(id) {
				this.selectesdId = id
				this.page = 1
				this.hasMoreData = true
			},
			//页面滚动改变 navBar 背景色
			handleScroll(e) {
				const scrollTop = e.detail.scrollTop
				scrollTop > 20 ? this.isBgColor = true : this.isBgColor = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.resale-wrapper {
		display: flex;
		flex-direction: column;
		background: #f6f6f6;
		height: 100vh;
		overflow: hidden;

		.scroll-box {
			height: 100%;
			white-space: nowrap;
			overflow: hidden;

			.container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 30rpx 30rpx 30rpx;

				.listings-nav {
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
					padding: 60rpx 0 20rpx 0;
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

						.placeholder-tag {
							width: 44rpx;
							height: 44rpx;
						}

						.placeholder-text {
							font-size: 30rpx;
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