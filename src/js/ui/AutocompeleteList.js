import Autocomplete from '../helpers/autocomplete'

class AutocompeleteList {
	constructor(selector, data) {
		this.data = data
		this.$el = document.querySelector(selector)

		this.listeners()
	}

	listeners() {
		this.onInput('.input__destination', '#destination', Object.keys(this.data))
		this.onInput('.input__origin', '#origin', Object.keys(this.data))
	}

	onInput(selectorWrapp, selectorItem, data) {
		document
			.querySelector(`${selectorWrapp} ${selectorItem}`)
			.addEventListener('input', function () {
				new Autocomplete(`${selectorWrapp} .input-list`, {
					value: this.value,
					data,
					input: selectorItem,
				})
			})
	}
}

export default AutocompeleteList
