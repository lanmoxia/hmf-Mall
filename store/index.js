import Vue from "vue"
import Vuex from "vuex"
import system from "@/store/modeules/system.js"
import listings from "@/store/modeules/listings.js"
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
	getters,
	modules: {
		system,
		listings
	}

})

export default store