import Vue from 'vue'
import App from './App.vue'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import './registerServiceWorker'
import './plugins/vue-the-mask'
import './plugins/vue-moment'

import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

firebase.initializeApp({
	apiKey: 'AIzaSyAiya38K8feUb8fBOp9eVL0JnNYuA9nA-s',
	authDomain: 'zivieri-app-unhas.firebaseapp.com',
	databaseURL: 'https://zivieri-app-unhas.firebaseio.com',
	projectId: 'zivieri-app-unhas',
	storageBucket: 'zivieri-app-unhas.appspot.com',
	messagingSenderId: '209188528919',
	appId: '1:209188528919:web:e28cfe7f012efc7f358d52',
})

Vue.config.productionTip = false

Vue.component('menu-icon', import('vue-material-design-icons/Menu.vue'))

let vue: Vue

firebase.auth().onAuthStateChanged(() => {
	if (vue) {
		return
	}
	vue = new Vue({
		el: '#app',
		router,
		store,
		vuetify,
		render: h => h(App),
	})
})
