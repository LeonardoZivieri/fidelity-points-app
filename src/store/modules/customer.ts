
import { firestore } from 'firebase'

import { Module, ActionTree } from 'vuex'

import State from '../models/State'
const actions: ActionTree<State, State> = {
	async customerConsult ( {}, customerDocument ) {
	},
}

const customerModule: Module<State, State> = {
	actions: actions,
}

export default customerModule
