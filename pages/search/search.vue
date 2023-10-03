<template>
	<view>
		<view class="search-wrapper">

			<u-search placeholder="请输入搜索内容" v-model="keyword" clearabled showAction actionText="搜索" animation
				@search="onSearch" @custom="onSearch" @clear="onClear">
			</u-search>

			<view class="search-history" v-if="false">
				<view class="history-item" v-for="(item,index) in 10" :key="item">
					<view class="text" @click="clickHitText(item)">{{item}}</view>
					<view class="close" @click="onClose(index)">
						<u-icon name="close" size="16" color="#999"></u-icon>
					</view>
				</view>
			</view>

			<view class="search-listings-list">
				<search-item v-for="item in listingsList" :key="item._id" :item="item"></search-item>
			</view>

			<view v-if="isEmpty">
				<u-empty mode="search" icon="https://cdn.uviewui.com/uview/empty/search.png">
				</u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				historyList: [],
				isEmpty: false,
				listingsList: [{
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
				}]
			}
		},
		methods: {
			//搜索事件
			onSearch() {

			},
			//删除历史
			onClose(index) {

			},
			//点击搜索历史的文字
			clickHitText(value) {

			},
			//清空搜索框
			onClear() {
				this.keyword = ""
				this.listingsList = []
			},

			getData() {

			}
		}
	}
</script>

<style lang="scss">
	.search-wrapper {
		height: 100vh;
		padding: 30rpx;
		padding-bottom: 150rpx;

		.search-history {
			margin-top: 30rpx;

			.history-item {
				@include flex-box();
				font-size: 32rpx;
				padding: 30rpx 0;
				color: #333;
				border-bottom: 1px solid $border-color-light;
			}
		}

		.search-listings-list {
			margin-top: 60rpx;
		}

	}
</style>