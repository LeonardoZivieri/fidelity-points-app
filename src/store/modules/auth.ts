import { auth, User } from 'firebase'

import Vue from 'vue'
import { Module, ActionTree } from 'vuex'

import State from '../models/State'

const actions: ActionTree<State, State> = {
	async authLoad ({ commit }) {
		auth().setPersistence
		auth().onAuthStateChanged((user) => {
			commit('AUTH_USER_CHANGED', user)
		})
	},
	async authLogin (
		store,
		{ email, password }: {email: string, password: string}
	) {
		let user = await auth().signInWithEmailAndPassword(email, password)
		store.commit('AUTH_USER_CHANGED', user)
	},
	async authLogout () {
		return auth().signOut()
	},
}

const authModule: Module<State, State> = {
	actions: actions,
	mutations: {
		'AUTH_USER_CHANGED' (store, user: User) {
			Vue.set(this.state, 'user', user)
			Vue.set(this.state, 'logged', !!user)
		}
	}
}

export default authModule
