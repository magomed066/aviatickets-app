class Autocomplete {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.data = options.data
		this.value = options.value
		this.input = document.querySelector(options.input)

		this.render()
		this.listeners()
	}

	onSelectItem(e) {
		if (e.target.classList.contains('input-list__item')) {
			const { item } = e.target.dataset

			this.input.value = item
			this.destroy()
		}
	}

	listeners() {
		this.onSelectItem = this.onSelectItem.bind(this)
		this.$el.addEventListener('click', this.onSelectItem)
	}

	render() {
		let matches = this.data.filter((item) => {
			const regex = new RegExp(`^${this.value}`, 'gi')
			return item.match(regex)
		})

		if (this.value.length === 0) {
			matches = []
			this.$el.innerHTML = ''
		}

		this.outputHtml(matches)
	}

	outputHtml(matches) {
		if (matches.length > 0) {
			const html = matches
				.map(
					(item) => `
          <li class="input-list__item" data-item='${item}'>${item}</li>
        `,
				)
				.join('')

			this.$el.innerHTML = html
		}
	}

	destroy() {
		this.$el.removeEventListener('click', this.onSelectItem)
		this.$el.innerHTML = ''
	}
}

export default Autocomplete
