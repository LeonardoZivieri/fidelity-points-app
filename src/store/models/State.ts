
import { User } from 'firebase'

export default class State {
	constructor (obj: {
		user?: User,
		logged?: boolean,
	} = {}) {
		this.user = obj.user || null
		this.logged = obj.logged
	}

	user: User|null;
	logged: boolean|undefined;
}
