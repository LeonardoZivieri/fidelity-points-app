import Vue from 'vue'
import Vuex from 'vuex'

import State from './models/State'

import AuthModule from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store<State>({
	state: new State(),
	modules: {
	},
	actions: {
		init () {
		},
	},
})
