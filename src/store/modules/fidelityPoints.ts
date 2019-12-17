
import { firestore } from 'firebase/app'

import { Module } from 'vuex'

import State from '../models/State'
import CustomerHistory from '../models/CustomerHistory'

const customerModule: Module<State, State> = {
	getters: {
		fidelityPointsLoading ({}, {}, { fpLoading }) {
			console.log('fidelityPointsLoading: ', fpLoading)
			return fpLoading
		},
		fidelityPointsCustomer ({}, {}, { fpCustomer }) {
			console.log('fidelityPointsCustomer: ', fpCustomer)
			return fpCustomer
		},
		fidelityPointsCustomerGetCustomerHistory ({}, {}, { fpCustomer, user }) {
			return async () => {
				let history: CustomerHistory[] = []

				if (user && fpCustomer) {
					let doc = await
					firestore()
						.collection('clients')
						.doc(user.uid)
						.collection('history')
						.doc(fpCustomer.getTelephone())
						.collection('story')
						.orderBy('data', 'desc')
						.get()

					if (!doc.empty) {
						doc.forEach(function (result) {
							console.log(result.data())
							history.push(CustomerHistory.fromFirestore(result.id, result.data()))
						})
					}
				}

				return history
			}
		}
	},
	mutations: {
		fidelityPointsSetLoading ({}, newLoadingState) {
			let state:any = this.state
			state.fpLoading = newLoadingState
		},
		fidelityPointsSetCustomer ({}, newCustomerState) {
			let state:any = this.state
			state.fpCustomer = newCustomerState
		},
	}
}

export default customerModule
