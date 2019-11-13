import Vue from 'vue'
import Vuex from 'vuex'

import State from './models/State'

import AuthModule from './modules/auth'
import CustomerModule from './modules/customer'

Vue.use(Vuex)

export default new Vuex.Store<State>({
	state: new State(),
	modules: {
		auth: AuthModule,
		customer: CustomerModule,
	},
	actions: {
		init () {
			this.dispatch('authLoad')
		},
	},
})
