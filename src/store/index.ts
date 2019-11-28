import Vue from 'vue'
import Vuex from 'vuex'

import State from './models/State'

import AuthModule from './modules/auth'
import CustomerModule from './modules/customer'
import FidelityPointsModule from './modules/fidelityPoints'

Vue.use(Vuex)

export default new Vuex.Store<State>({
	state: new State(),
	modules: {
		auth: AuthModule,
		customer: CustomerModule,
		fidelityPoints: FidelityPointsModule,
	},
	actions: {
		init () {
			this.dispatch('authLoad')
		},
	},
})
