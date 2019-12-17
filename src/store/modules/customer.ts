
import { firestore } from 'firebase'

import { Module, ActionTree } from 'vuex'

import State from '../models/State'
import Customer from '../models/Customer'
import CustomerHistory from '../models/CustomerHistory'

const actions: ActionTree<State, State> = {
	async customerConsult ({}, customerTelephone) {
		if (this.state.user) {
			let doc = await firestore()
				.collection('clients').doc(this.state.user.uid)
				.collection('client').doc(customerTelephone).get()

			let data:firestore.DocumentData|undefined

			if (doc && doc.exists) {
				data = doc.data()
			}

			return Customer.fromFirestore(customerTelephone, data)
		}
	},
	async customerSave ({}, customer: Customer) {
		if (this.state.user) {
			let data = Customer.toFirestore(customer)
			return firestore()
				.collection('clients')
				.doc(this.state.user.uid)
				.collection('client')
				.doc(data.index)
				.set(data.data)
		}
	},
	async customerRegistryHistory ({ dispatch }, { customer, comment, points }: {customer:Customer, comment:string, points:number}) {
		if (this.state.user) {
			console.log({ customer, comment, points })
			let data = CustomerHistory.toFirestore(new CustomerHistory(comment, points))

			customer.setScore(customer.getScore() + points)
			dispatch('customerSave', customer)

			return firestore()
				.collection('clients')
				.doc(this.state.user.uid)
				.collection('history')
				.doc(customer.getTelephone())
				.collection('story')
				.add(data)
		}
	},
}

const customerModule: Module<State, State> = {
	actions: actions,
}

export default customerModule
