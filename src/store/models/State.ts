
import { User } from 'firebase/app'
import Customer from './Customer'

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

	fpLoading: boolean = false;
	fpCustomer: Customer|null = null;
}
