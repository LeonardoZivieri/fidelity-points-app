import { firestore } from 'firebase'

declare type DocumentData = firestore.DocumentData;

export default class Customer {
	private _saved:boolean = false;
	private _document:string = '';
	private _name:string = '';
	private _email:string = '';
	private _birthday:number = 0;

	get saved (): boolean {
		return this._saved
	}
	set saved (saved:boolean) {
		this.setSaved(saved)
	}
	public getSaved ():boolean {
		return this._saved
	}
	public setSaved (saved:boolean) {
		this._saved = saved
	}

	get document (): string {
		return this._document
	}
	set document (document:string) {
		this.setDocument(document)
	}
	public getDocument ():string {
		return this._document
	}
	public setDocument (document:string) {
		this._document = document
	}
	public getDocumentFormatted ():string {
		return this._document.replace(/^([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})-?([0-9]{2})$/, '$1.$2.$3-$4')
	}

	get name (): string {
		return this._name
	}
	set name (name:string) {
		this.setName(name)
	}
	public getName ():string {
		return this._name
	}
	public setName (name:string) {
		this._name = name
	}

	get email (): string {
		return this._email
	}
	set email (email:string) {
		this.setEmail(email)
	}
	public getEmail ():string {
		return this._email
	}
	public setEmail (email:string) {
		this._email = email
	}

	get birthday (): number {
		return this._birthday
	}
	set birthday (date:number) {
		this.setBirthday(date)
	}
	public getBirthday ():number {
		return this._birthday
	}
	public setBirthday (date:number|Date|null) {
		if (date instanceof Date) {
			date = date.getTime()
		}
		if (date === null) {
			date = -1
		}
		this._birthday = date
	}
	public getBirthdayDate ():Date {
		return new Date(this._birthday)
	}

	static fromFirestore (document:string, data: DocumentData|undefined) : Customer {
		let client = new Customer()

		if (data === undefined) {
			return client
		}

		client.setSaved(true)
		client.setDocument(document)
		client.setName(data.name)
		client.setEmail(data.email)
		client.setBirthday(data.birthday)

		return client
	}

	static toFirestore (data: Customer) {
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
