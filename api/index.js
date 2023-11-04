const baseURL = `https://fc-mp-23498871-381c-41d5-8f34-8e67d2bfcdb1.next.bspapp.com`

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			headers: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				const data = res.data
				if (data.errCode === 400) {
					uni.showToast({
						icon: 'none',
						title: '获取失败'
					})
				}
				resolve(data)
			},
			fail: (error) => {
				uni.showToast({
					icon: 'error',
					title: '系统错误'
				})
				reject(error)
			}
		})
	})
}