const getters = {
	statusBarHeight: state => state.system.statusBarHeight,
	titleBarHeight: state => state.system.titleBarHeight,
	menuWidth: state => state.system.menuWidth,
	isDetail: state => state.listings.isDetail,
	houseDetailList: state => state.listings.houseDetailList
}
export default getters