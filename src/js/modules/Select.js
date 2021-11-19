function getTemplate(placeholder, data = [], selectedId) {
	let text = placeholder || ''

	const items = data.map((item) => {
		let cls = ''

		if (item.id === selectedId) {
			text = item.label
			cls = 'selected'
		}

		return `<li class="select-list__item ${cls}" data-type="item" data-currency="${item.value}" data-id="${item.id}">${item.label}</li>`
	})

	return `
    <div class="select__overlay" data-type="overlay"></div>
    <div class="select__title" data-type="input">
      <span data-type="value">${text}</span>
      <i class="fas fa-chevron-down icon" data-type="arrow"></i>
    </div>
    <ul class="select-list">
      ${items.join('')}
    </ul>
  `
}

class Select {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.options = options
		this.selectedId = options.selectedId

		this._render()
		this._listen()
	}

	_render() {
		const { placeholder, data } = this.options

		this.$el.innerHTML = getTemplate(placeholder, data, this.selectedId)
	}

	_listen() {
		this.onClickHandler = this.onClickHandler.bind(this)
		this.$el.addEventListener('click', this.onClickHandler)

		this.$arrow = this.$el.querySelector('[data-type="arrow"]')
		this.$value = this.$el.querySelector('[data-type="value"]')
	}

	onClickHandler(e) {
		const { type } = e.target.dataset

		if (type === 'input') {
			this.toggleClass()
		} else if (type === 'item') {
			const { id } = e.target.dataset
			this.select(id)
		} else if (type === 'overlay') {
			this.close()
		}
	}

	select(id) {
		console.log(id)
		this.selectedId = id
		this.$value.textContent = this.current.label
		this.close()

		this.$el
			.querySelectorAll([`[data-type="item"]`])
			.forEach((item) => item.classList.remove('selected'))

		this.$el
			.querySelector([`[data-id="${this.selectedId}"]`])
			.classList.add('selected')
	}

	get current() {
		return this.options.data.find((item) => item.id === +this.selectedId)
	}

	get isOpen() {
		return this.$el.classList.contains('active')
	}

	toggleClass() {
		this.isOpen ? this.close() : this.open()
	}

	open() {
		this.$el.classList.add('active')

		this.$arrow.classList.remove('fa-chevron-down')
		this.$arrow.classList.add('fa-chevron-up')
	}

	close() {
		this.$el.classList.remove('active')

		this.$arrow.classList.remove('fa-chevron-up')
		this.$arrow.classList.add('fa-chevron-down')
	}

	onClose() {}

	destroy() {
		this.$el.removeEventListener('click', this.onClickHandler)
		this.$el.remove()
	}
}

export default Select
