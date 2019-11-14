import { firestore } from 'firebase'

declare type DocumentData = firestore.DocumentData;

export default class Customer {

	constructor () {
	}

	private _document:string = '';
	private _name:string = '';
	private _email:string = '';
	private _birthday:number = 0;

	get document (): string {
		return this._document
	}
	public setDocument(document:string) {
		this._document = document
	}

	get name (): string {
		return this._name
	}
	public setName(name:string) {
		this._name = name
	}

	get email (): string {
		return this._email
	}
	public setEmail(email:string) {
		this._email = email
	}

	get birthday (): number {
		return this._birthday
	}
	public setBirthday(date:number|Date|null) {
		if ( date instanceof Date ) {
			date = date.getTime()
		}
		if ( date === null ) {
			date = -1
		}
		this._birthday = date
	}

	static fromFirestore( document:string, data: DocumentData|undefined ) : Customer {
		let client = new Customer()

		if ( data === undefined ) {
			return client;
		}

		client.setDocument(document);
		client.setName(data.name);
		client.setEmail(data.email);
		client.setBirthday(data.birthday);

		return client
	}

	static toFirestore( data: Customer ) {
		return {
			index: data.document,
			data: {
				'name': data.name,
				'email': data.email,
				'birthday': data.birthday,
			},
		}
	}

}
