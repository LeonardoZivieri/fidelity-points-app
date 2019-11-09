import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router/types'

import GuestGuard from './guards/guest'
import LoggedGuard from './guards/logged'

import Loading from '../plugins/loading'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
	{
		path: '/login',
		name: 'login',
		beforeEnter: GuestGuard,
		component: () => import('../views/Login.vue')
	},
	{
		path: '/app',
		name: 'app',
		beforeEnter: LoggedGuard,
		component: () => import('../views/App.vue'),
		children: [
			{
				path: '',
				component: () => import('../views/AppChilds/Index.vue')
			},
			{
				path: 'fidelity-points',
				component: () => import('../views/AppChilds/FidelityPoints.vue')
			}
		]
	},
	{
		path: '*',
		redirect: 'login'
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
