import Autocomplete from '../helpers/autocomplete'

class UI {
	_form = document.getElementById('form')
	_origin = document.getElementById('origin')
	_destination = document.getElementById('destination')
	_depart = document.getElementById('originDate')
	_return = document.getElementById('destinationDate')

	get getForm() {
		return this._form
	}

	setData(data) {
		const acData = Object.keys(data).map((item) => ({
			label: item,
			value: item,
		}))

		new Autocomplete(this._origin, {
			data: acData,
		})
		new Autocomplete(this._destination, {
			data: acData,
		})
	}
}

export default new UI()
