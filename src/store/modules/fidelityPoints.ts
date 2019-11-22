
import { firestore } from 'firebase'

import { Module, ActionTree } from 'vuex'

import State from '../models/State'
import Customer from '../models/Customer'
import CustomerHistory from '../models/CustomerHistory'

const customerModule: Module<State, State> = {
	getters: {
		fidelityPointsLoading( store, getters, {fpLoading} ) {
			console.log('fidelityPointsLoading: ', fpLoading)
			return fpLoading;
		},
		fidelityPointsCustomer( store, getters, {fpCustomer} ) {
			console.log('fidelityPointsCustomer: ', fpCustomer)
			return fpCustomer;
		},
		fidelityPointsCustomerGetCustomerHistory( store, getters, {fpCustomer,user} ) {
			return async ( from: number = 0, to: number = 10 ) => {

				let history: CustomerHistory[] = [];

				if ( user && fpCustomer ) {
					let doc = await
						firestore()
						.collection('clients')
						.doc(user.uid)
						.collection('history')
						.doc(fpCustomer.getDocument())
						.collection('story')
						.orderBy('data', 'desc')
						.get()

					if ( !doc.empty ) {
						doc.forEach(function(result) {
							console.log(result.data())
							history.push( CustomerHistory.fromFirestore( result.id, result.data() ) )
						})
					}
				}

				return history;
			}
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
