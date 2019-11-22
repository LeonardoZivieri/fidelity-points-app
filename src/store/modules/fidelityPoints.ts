
import { firestore } from 'firebase'

import { Module, ActionTree } from 'vuex'

import State from '../models/State'
import Customer from '../models/Customer'

const customerModule: Module<State, State> = {
	getters: {
		fidelityPointsLoading( store, getters, {fpLoading} ) {
			console.log('fidelityPointsLoading: ', fpLoading)
			return fpLoading;
		},
		fidelityPointsCustomer( store, getters, {fpCustomer} ) {
			console.log('fidelityPointsCustomer: ', fpCustomer)
			return fpCustomer;
		}
	},
	mutations: {
		fidelityPointsSetLoading( store, newLoadingState ) {
			let state:any = this.state;
			state.fpLoading = newLoadingState
		},
		fidelityPointsSetCustomer( store, newCustomerState ) {
			let state:any = this.state;
			state.fpCustomer = newCustomerState
		},
	}
}

export default customerModule
