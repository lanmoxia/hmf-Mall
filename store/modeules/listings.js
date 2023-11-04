import {
	getRetalHouseDetail,
	getResaleHouseDetail
} from '@/api/request.js'
const listings = {
	state: {
		isDetail: false,
		houseDetailList: {}
	},
	mutations: {
		SET_DETAIL_STATE(state, value) {
			state.isDetail = value
		},
		SET_HOUSE_DETAIL_LIST(state, list) {
			state.houseDetailList = list
		}
	},
	actions: {
		async getRentalDetailList({
			commit
		}, id) {
			try {
				let res = await getRetalHouseDetail(id)
				commit('SET_HOUSE_DETAIL_LIST', res.data)
			} catch (error) {
				// 处理错误
				console.error('Error:', error)
				commit('SET_HOUSE_DETAIL_LIST', {})
			}
		},
		async getResaleDetailList({
			commit
		}, id) {
			try {
				let res = await getResaleHouseDetail(id)
				commit('SET_HOUSE_DETAIL_LIST', res.data)
			} catch (error) {
				// 处理错误
				console.error('Error:', error)
				commit('SET_HOUSE_DETAIL_LIST', {})
			}
		},
	}
}

export default listings