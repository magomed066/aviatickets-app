class Form {
	constructor() {
		this._form = document.getElementById('form')
		this._origin = document.getElementById('origin')
		this._destination = document.getElementById('destination')
		this._depart = document.getElementById('departDate')
		this._return = document.getElementById('returnDate')
		this._btnClear = document.querySelector('.btn-clear')

		this.onClear = this.onClear.bind(this)
		this.onClear()
	}

	onClear() {
		this._form.reset()
	}

	get getForm() {
		return this._form
	}

	get btnClear() {
		return this._btnClear
	}
}

export default new Form()
