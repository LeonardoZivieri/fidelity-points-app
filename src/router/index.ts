import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import GuestGuard from './guards/guest'
import LoggedGuard from './guards/logged'

import Loading from '../plugins/loading'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	Loading.show()
	next()
})
router.afterEach(() => {
	Loading.hide()
})

export default router
