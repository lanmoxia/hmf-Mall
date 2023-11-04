<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const result = uni.getSystemInfoSync()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/static/fonts/iconfont.css';

	view,
	text {
		box-sizing: border-box;
	}
</style>