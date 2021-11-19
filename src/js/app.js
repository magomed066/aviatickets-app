import '../scss/main.scss'
import Select from '@modules/Select'
import dateFormatter from './helpers/dateFormatter'
import store from './store/store'
import AutocompeleteList from './ui/AutocompeleteList'
import Form from './ui/Form'

window.addEventListener('DOMContentLoaded', () => {
	new Select('.select', {
		placeholder: '$ USD',
		data: [
			{ id: 1, value: 'usd', label: '$ USD' },
			{ id: 2, value: 'eur', label: '€ EURO' },
		],
		selectedId: 1,
	})

	const app = document.querySelector('.main')
	const loading = document.querySelector('.loading')
	app.style.display = 'none'

	const form = Form.getForm

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		onFormSubmit.bind(this)()
	})

	Form.btnClear.addEventListener('click', Form.onClear)

	async function initApp() {
		await store.init()

		loading.remove()
		app.style.display = 'block'
		new AutocompeleteList('.input-list', store.shortCitiesList)
	}

	async function onFormSubmit() {
		const dataArr = [...new FormData(this)]
		const data = Object.fromEntries(dataArr)
		// Code, code, 2019-09, 2019-10
		const { origin, destination, departDate, returnDate } = data

		const originCode = store.getCityCodeByKey(origin)
		const destinationCode = store.getCityCodeByKey(destination)
		const departDateTransformed = dateFormatter(departDate)
		const destinationDateTransformed = dateFormatter(returnDate)

		await store.fetchTickets({
			origin: originCode,
			destination: destinationCode,
			depart_date: departDateTransformed,
			return_date: destinationDateTransformed,
		})

		this.reset()
	}

	initApp()
})
