
import { firestore } from 'firebase'

import { Module, ActionTree } from 'vuex'

import State from '../models/State'
import Customer from '../models/Customer'

const actions: ActionTree<State, State> = {
	async customerConsult ({ commit }, customerDocument) {
		if (this.state.user) {
			console.log({
				'displayName': this.state.user.displayName,
				'email': this.state.user.email,
				'emailVerified': this.state.user.emailVerified,
				'isAnonymous': this.state.user.isAnonymous,
				'metadata': this.state.user.metadata,
				'phoneNumber': this.state.user.phoneNumber,
				'photoURL': this.state.user.photoURL,
				'providerData': this.state.user.providerData,
				'providerId': this.state.user.providerId,
				'refreshToken': this.state.user.refreshToken,
				'tenantId': this.state.user.tenantId,
				'uid': this.state.user.uid,
			})
			let doc = await firestore()
				.collection('clients').doc(this.state.user.uid)
				.collection('client').doc(customerDocument).get()

			let data:firestore.DocumentData|undefined

			if (doc && doc.exists) {
				data = doc.data()
			}

			return Customer.fromFirestore(customerDocument, data)
		}
	},
	async customerSave ({ commit }, customer: Customer) {
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
}

const customerModule: Module<State, State> = {
	actions: actions,
}

export default customerModule
