
export default class Loading {
	static show () {
		if (Loading.document) {
			let documentAttributes: any = Loading.document.attributes
			documentAttributes.loading.value = 'on'
		}
	}
	static hide () {
		if (Loading.document) {
			let documentAttributes: any = Loading.document.attributes
			documentAttributes.loading.value = 'off'
		}
	}

	static document: HTMLElement|null = document.querySelector('body');
}
