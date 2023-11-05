<template>
	<view>
		<view class="search-wrapper">
			<u-search class="search-bar" placeholder="请输入搜索内容" v-model="keyword" clearabled showAction actionText="搜索"
				animation @change="onChange" @search="onSearch" @custom="onSearch" @clear="onClear" :height="35">
			</u-search>
			<!-- 搜索历史 -->
			<template v-if="listingsList.length <= 0 && keyword === ''">
				<!-- 租赁房源搜索历史 -->
				<view class="search-history" v-if="listingType === 'rental' && rentalHistoryList.length > 0">
					<view class="history-item" v-for="(item, index) in rentalHistoryList" :key="index">
						<u-tag @click="clickHitText(item)" @close="onClearHistory(index, 'rental')" :text="item.keyword"
							size="large" closable bgColor="#f6f6f6" borderColor="#f6f6f6" color="#606b82"></u-tag>
					</view>
				</view>
				<!-- 买卖房源搜索历史 -->
				<view class="search-history" v-if="listingType === 'resale' && resaleHistoryList.length > 0">
					<view class="history-item" v-for="(item, index) in resaleHistoryList" :key="index">
						<u-tag @click="clickHitText(item)" @close="onClearHistory(index, 'resale')" :text="item.keyword"
							size="large" closable bgColor="#f6f6f6" borderColor="#f6f6f6" color="#606b82"></u-tag>
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

					<view v-else-if="isSearched && keyword !== '' && !isLoading || isEmpty">
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
		},
		onShow() {
			this.rentalHistoryList = uni.getStorageSync("rentalHistoryList") || []
			this.resaleHistoryList = uni.getStorageSync("resaleHistoryList") || []
		},
		onReachBottom() {
			if (this.listingsList.length > 0) {
				this.loadMore()
			}
		},
		methods: {
			onChange(e) {
				if (this.isSearched && this.isEmpty) {
					this.isSearched = false
					this.isEmpty = false
				}
			},
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
						// console.log('lodMore', this.listingsList)
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
				const trimmedKeyword = this.keyword.trim()
				if (trimmedKeyword === '') {
					this.isLoading = false
					this.isEmpty = false
					this.isSearched = false
					return
				}
				if (this.listingType === "rental") {
					res = await getRetalSearchList(this.keyword)
				} else if (this.listingType === "resale") {
					res = await getResaleSearchList(this.keyword)
				}
				this.listingsList = res.data
				// console.log('search', this.listingsList)
				this.isLoading = false
				this.isEmpty = this.listingsList.length === 0;
			},
			//搜索事件
			onSearch() {
				this.rentalHistoryList = uni.getStorageSync("rentalHistoryList") || [];
				this.resaleHistoryList = uni.getStorageSync("resaleHistoryList") || [];
				const historyItem = {
					type: this.listingType,
					keyword: this.keyword
				};
				let updatedList;
				if (this.listingType === "rental") {
					const filteredList = this.rentalHistoryList.filter(item => item.keyword !== this.keyword);
					updatedList = [historyItem, ...filteredList];
					uni.setStorageSync("rentalHistoryList", updatedList);
				} else if (this.listingType === "resale") {
					const filteredList = this.resaleHistoryList.filter(item => item.keyword !== this.keyword);
					updatedList = [historyItem, ...filteredList];
					uni.setStorageSync("resaleHistoryList", updatedList);
				}
				this.hasMoreData = true;
				this.isSearched = true;
				this.getList();
			},
			//删除历史
			onClearHistory(index, type) {
				if (type === "rental") {
					this.rentalHistoryList.splice(index, 1)
					uni.setStorageSync("rentalHistoryList", this.rentalHistoryList)

				} else if (type === "resale") {
					this.resaleHistoryList.splice(index, 1)
					uni.setStorageSync("resaleHistoryList", this.resaleHistoryList)
				}
			},
			//点击搜索历史的文字
			clickHitText(History) {
				this.keyword = History.keyword
				this.getList()
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
		position: relative;

		.validator-search-text {
			font-size: 20rpx;
			color: red;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.validator-search-text {
			font-size: 20rpx;
			color: red;
			position: absolute;
			left: 0;
			right: 0;
		}

		.search-bar {
			/deep/.uni-input-placeholder .u-search__content__input--placeholder {
				color: red;
			}
		}

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