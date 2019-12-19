import { auth, User } from 'firebase/app'

import Vue from 'vue'
import { Module, ActionTree } from 'vuex'

import State from '../models/State'

const actions: ActionTree<State, State> = {
	async authLoad ({ commit }) {
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
	async setPassword (
		store,
		{ oldPassword, newPassword }:{oldPassword:string, newPassword:string}
	) {
		let user: User|null = this.state.user
		if (user) {
			let success = await auth().signInWithEmailAndPassword(user.email || '', oldPassword)
			return user.updatePassword(newPassword)
		}
		throw {
			'code': 'auth/operation-not-allowed',
			'message': 'You need to be logged to set the password'
		}
	}
}

const authModule: Module<State, State> = {
	actions: actions,
	mutations: {
		'AUTH_USER_CHANGED' ({}, user: User) {
			Vue.set(this.state, 'user', user)
			Vue.set(this.state, 'logged', !!user)
		}
	}
}

export default authModule
