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
		beforeEnter: LoggedGuard,
		component: () => import('../views/App.vue'),
		children: [
			{
				path: '',
				name: 'app',
				component: () => import('../views/AppChilds/Index.vue')
			},
			{
				path: 'fidelity-points',
				component: () => import('../views/AppChilds/FidelityPoints.vue'),
				children: [
					{
						path: '',
						name: 'app.fidelity-points.search',
						component: () => import('../views/AppChilds/FidelityPointsChilds/Search.vue')
					},
					{
						path: 'info',
						name: 'app.fidelity-points.info',
						component: () => import('../views/AppChilds/FidelityPointsChilds/Info.vue')
					},
					{
						path: 'edit',
						name: 'app.fidelity-points.edit',
						component: () => import('../views/AppChilds/FidelityPointsChilds/Edit.vue')
					},
					{
						path: 'history-registry',
						name: 'app.fidelity-points.registry',
						component: () => import('../views/AppChilds/FidelityPointsChilds/HistoryRegistry.vue')
					},
					{
						path: 'history-view',
						name: 'app.fidelity-points.view',
						component: () => import('../views/AppChilds/FidelityPointsChilds/HistoryView.vue')
					}
				]
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

router.beforeEach(({}, {}, next) => {
	Loading.show()
	next()
})
router.afterEach(() => {
	Loading.hide()
})

export default router
