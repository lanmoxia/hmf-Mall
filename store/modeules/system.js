const systemInfo = uni.getSystemInfoSync()

//获取状态栏高度
const getStatusBarHeight = () => systemInfo.statusBarHeight

//获取标题栏
const getTitleBarHeight = () => {

	// #ifdef MP-WEIXIN
	let menuBtnInfo = uni.getMenuButtonBoundingClientRect()
	let height = menuBtnInfo.height + (menuBtnInfo.top - getStatusBarHeight()) * 2
	return height
	// #endif

	return 70
}
const getmenuWidth = () => {
	// #ifdef MP-WEIXIN
	let menuBtnInfo = uni.getMenuButtonBoundingClientRect()
	let width = menuBtnInfo.width
	return width
	// #endif

	return 44
}
const system = {
	state: {
		statusBarHeight: getStatusBarHeight(),
		titleBarHeight: getTitleBarHeight(),
		menuWidth: getmenuWidth()
	}
}

export default system