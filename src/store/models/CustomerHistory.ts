import { firestore } from 'firebase'

declare type DocumentData = firestore.DocumentData;

export default class CustomerHistory {
	private _saved:boolean = false;
	private _id:string = '';
	private _comment:string = '';
	private _point:number = 0;
	private _date:Date|null = null;

	constructor( comment:string = '', point:number = 0 ) {
		this._comment = comment;
		this._point = point;
	}

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

	get id (): string {
		return this._id
	}
	public getId ():string {
		return this._id
	}

	get comment (): string {
		return this._comment
	}
	set comment (comment:string) {
		this.setComment(comment)
	}
	public getComment ():string {
		return this._comment
	}
	public setComment (comment:string) {
		this._comment = comment
	}

	get point (): number {
		return this._point
	}
	set point (point:number) {
		this.setPoint(point)
	}
	public getPoint ():number {
		return this._point
	}
	public setPoint (point:number) {
		this._point = point
	}

	get date (): Date|null {
		return this._date
	}
	set date (date:Date|null) {
		this.setDate(date)
	}
	public getDate ():Date|null {
		return this._date
	}
	public setDate (date:Date|null) {
		this._date = date
	}

	static fromFirestore (document:string, data: DocumentData|undefined) : CustomerHistory {
		let client = new CustomerHistory()

		if (data === undefined) {
			return client
		}

		client.setSaved(true)
		client._id = document;
		client.setComment(data.comment)
		client.setPoint(data.point)
		client.setDate(new Date(data.data))

		return client
	}

	static toFirestore (data: CustomerHistory) {
		return {
			'comment': data.comment,
			'point': data.point,
			'data': new Date().getTime(),
		}
	}
}
