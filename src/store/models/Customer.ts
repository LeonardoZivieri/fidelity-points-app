import { firestore } from 'firebase/app'

declare type DocumentData = firestore.DocumentData;

export default class Customer {
	private _saved:boolean = false;
	private _telephone:string = '';
	private _name:string = '';
	private _email:string = '';
	private _birthday:number = 0;
	private _score:number = 0;

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

	get telephone (): string {
		return this._telephone
	}
	set telephone (telephone:string) {
		this.setTelephone(telephone)
	}
	public getTelephone ():string {
		return this._telephone
	}
	public setTelephone (telephone:string) {
		this._telephone = telephone
	}
	public getTelephoneFormatted ():string {
		return this._telephone.replace(/^\(?([0-9]{2})\)?\s?([0-9]{5})-?([0-9]{4})$/, '($1) $2-$3')
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

	get score (): number {
		return this._score
	}
	set score (date:number) {
		this.setBirthday(date)
	}
	public getScore ():number {
		return this._score
	}
	public setScore (score:number) {
		this._score = score || 0
	}

	static fromFirestore (telephone:string, data: DocumentData|undefined) : Customer {
		let client = new Customer()

		client.setTelephone(telephone)

		if (data === undefined) {
			return client
		}

		client.setSaved(true)
		client.setName(data.name)
		client.setEmail(data.email)
		client.setBirthday(data.birthday)
		client.setScore(data.score)

		return client
	}

	static toFirestore (data: Customer) {
		return {
			index: data.telephone,
			data: {
				'name': data.name,
				'email': data.email,
				'birthday': data.birthday,
				'score': data.score,
			},
		}
	}
}
