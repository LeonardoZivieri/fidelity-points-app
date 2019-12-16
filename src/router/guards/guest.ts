
import { NavigationGuard } from 'vue-router'

import { auth } from 'firebase'

const guard: NavigationGuard = function (to, from, next) {
	const currentUser = auth().currentUser
	if (currentUser != null) {
		next('app')
	} else {
		next()
	}
}
export default guard