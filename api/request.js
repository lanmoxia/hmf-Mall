import {
	request
} from './index.js'

export const getRentalNav = () => {
	return request({
		url: '/rental-nav/getNav'
	})
}

export const getRetalHouseList = (navid, page, size) => {
	return request({
		url: '/rental-list/getList',
		method: "POST",
		data: {
			navid,
			page,
			size
		}
	})
}

export const getRetalSearchList = (keyword, page, size) => {
	return request({
		url: '/rental-list/getSearch',
		method: "POST",
		data: {
			keyword,
			page,
			size
		}
	})
}

export const getRetalHouseDetail = (id) => {
	return request({
		url: '/rental-list/getDetail',
		method: "POST",
		data: {
			id
		}
	})
}



export const getResaleNav = () => {
	return request({
		url: '/resale-nav/getNav'
	})
}

export const getResaleHouseList = (navid, page, size) => {
	return request({
		url: '/resale-list/getList',
		method: "POST",
		data: {
			navid,
			page,
			size
		}
	})
}

export const getResaleSearchList = (keyword, page, size) => {
	return request({
		url: '/resale-list/getSearch',
		method: "POST",
		data: {
			keyword,
			page,
			size
		}
	})
}

export const getResaleHouseDetail = (id) => {
	return request({
		url: '/resale-list/getDetail',
		method: "POST",
		data: {
			id
		}
	})
}