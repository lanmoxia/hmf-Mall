<template>
	<view>
		<view class="search-wrapper">

			<u-search placeholder="请输入搜索内容" v-model="keyword" clearabled showAction actionText="搜索" animation
				@search="onSearch" @custom="onSearch" @clear="onClear" :height="35">
			</u-search>
			<!-- 搜索历史 -->
			<!-- <view class="search-history" v-if="listingsList.length <= 0 && keyword === ''">
				<view class="history-item" v-for="(item,index) in historyList" :key="item._id">
					<u-tag @click="clickHitText(item)" @close="onClose(index)" :text="item" size="large" closable
						bgColor="#f6f6f6" borderColor="#f6f6f6" color="#606b82"></u-tag>
				</view>
			</view> -->
			<template v-if="listingsList.length <= 0 && keyword === ''">
				<!-- 租赁房源搜索历史 -->
				<view class="search-history" v-if="listingType === 'rental' && rentalHistoryList.length > 0">
					<view class="history-item" v-for="(item, index) in rentalHistoryList" :key="index">
						<u-tag @click="clickHitText(item)" @close="onClose(index, 'rental')" :text="item" size="large" closable
							bgColor="#f6f6f6" borderColor="#f6f6f6" color="#606b82"></u-tag>
					</view>
				</view>
				<!-- 买卖房源搜索历史 -->
				<view class="search-history" v-if="listingType === 'resale' && resaleHistoryList.length > 0">
					<view class="history-item" v-for="(item, index) in resaleHistoryList" :key="index">
						<u-tag @click="clickHitText(item)" @close="onClose(index, 'resale')" :text="item" size="large" closable
							bgColor="#f6f6f6" borderColor="#f6f6f6" color="#606b82"></u-tag>
					</view>
				</view>
			</template>
			<template v-else>
				<!-- 	搜索的房源列表 -->
				<block v-if="listingsList.length > 0">
					<view class="search-listings-list" v-for="item in listingsList" :key="item._id">
						<block v-if="listingType === 'rental'">
							<rental-searchitem :search-item="item"></rental-searchitem>
						</block>
						<block v-if="listingType === 'resale'">
							<resale-searchitem :search-item="item"></resale-searchitem>
						</block>
					</view>
				</block>

				<block v-else>

					<view v-if="isLoading">
						<u-loadmore status="loading" bg-color="#fff" margin-top="50%" />
					</view>

					<view v-else-if="keyword !== '' && isSearched && !isLoading">
						<u-empty mode="search" marginTop="50%" icon="https://cdn.uviewui.com/uview/empty/search.png"></u-empty>
					</view>
				</block>

				<view class="loadmore" v-if="isNomore && !isLoadingMore">
					<u-loadmore status="nomore" color="rgb(192, 196, 204)" bg-color="#fff" :margin-top="0" />
				</view>
			</template>
		</view>
		<block v-if="listingType === 'rental'">
			<rental-detailpopup></rental-detailpopup>
		</block>
		<block v-if="listingType === 'resale'">
			<resale-detailpopup></resale-detailpopup>
		</block>
	</view>
</template>

<script>
	import {
		getRetalSearchList,
		getResaleSearchList
	} from '@/api/request.js'
	export default {
		data() {
			return {
				page: 1,
				size: 6,
				isNomore: false,
				isLoading: false,
				isLoadingMore: false, // 是否加载更多
				hasMoreData: true, // 是否还有更多数据
				keyword: "",
				historyList: [],
				rentalHistoryList: [], // 租赁房源搜索历史记录
				resaleHistoryList: [], // 买卖房源搜索历史记录
				isEmpty: false,
				listingsList: [],
				listingType: "rental", // 房源类型 (租赁还是买卖)
				isSearched: false // 是否开始搜索
			}
		},
		onLoad(options) {
			if (options.type === "rental") {
				this.listingType = "rental"
			} else if (options.type === "resale") {
				this.listingType = "resale"
			}
			let history = uni.getStorageSync("historyList") || []
			this.rentalHistoryList = history.filter(item => item.type === "rental").map(item => item.keyword)
			this.resaleHistoryList = history.filter(item => item.type === "resale").map(item => item.keyword)
		},
		onReachBottom() {
			if (this.listingsList.length > 0) {
				this.loadMore()
			}
		},
		methods: {
			// 上拉加载更多数据
			async loadMore() {
				uni.showLoading({
					title: '加载中'
				})
				if (!this.hasMoreData || this.isLoadingMore) return
				this.isLoadingMore = true
				this.page++
				try {
					let res
					if (this.listingType === "rental") {
						res = await getRetalSearchList(this.keyword, this.page)
					} else if (this.listingType === "resale") {
						res = await getResaleSearchList(this.keyword, this.page)
					}
					if (res.data.length >= 0) {
						this.listingsList = this.listingsList.concat(res.data)
						console.log('lodMore', this.listingsList)
					} else {
						this.hasMoreData = false
						this.isLoadingMore = false
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error(error)
				}
				uni.hideLoading()
				this.isLoadingMore = false
				this.isNomore = true
			},
			async getList() {
				this.isLoading = true
				let res
				if (this.listingType === "rental") {
					res = await getRetalSearchList(this.keyword)
				} else if (this.listingType === "resale") {
					res = await getResaleSearchList(this.keyword);
				}
				this.listingsList = res.data
				console.log('search', this.listingsList)
				this.isLoading = false
			},
			//搜索事件
			onSearch() {
				const historyList = uni.getStorageSync("historyList") || []
				const historyItem = {
					type: this.listingType,
					keyword: this.keyword
				}
				const filteredList = historyList.filter(item => item.keyword !== this.keyword || item.type !== this.listingType)
				const updatedList = [historyItem, ...filteredList]
				uni.setStorageSync("historyList", updatedList)
				this.hasMoreData = true
				this.isSearched = true
				this.getList()
			},
			//删除历史
			onClose(index, type) {
				const historyList = uni.getStorageSync("historyList") || []
				const filteredList = historyList.filter(item => item.keyword !== this.historyList[index] || item.type !== type)
				uni.setStorageSync("historyList", filteredList)
				if (type === "rental") {
					this.rentalHistoryList.splice(index, 1)
				} else if (type === "resale") {
					this.resaleHistoryList.splice(index, 1)
				}
			},
			//点击搜索历史的文字
			clickHitText(value) {
				this.keyword = value;
				this.getList();
			},
			//清空搜索框
			onClear() {
				this.keyword = ""
				this.listingsList = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrapper {
		height: 100vh;
		padding: 30rpx;
		padding-bottom: 150rpx;

		.loadmore {
			padding-bottom: 15rpx;
		}

		.search-history {
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;

			// &:hover {
			// 	color: darken($color: #606b82, $amount: 20)
			// }
			// }

			// .close {
			// 	position: absolute;
			// 	top: 10rpx;
			// 	right: 10rpx;
			// 	border-radius: 50%;

			// 	&:hover {
			// 		background-color: darken($color: #f6f6f6, $amount: 15);
			// 		border-radius: 50%;
			// 	}
			// }
			// }
		}

		.search-listings-list {
			margin-top: 60rpx;
		}

	}
</style>