import '../scss/main.scss'
// import '../css/style.css'
import Select from '@modules/Select'

window.addEventListener('DOMContentLoaded', () => {
	new Select('.select', {
		placeholder: '$ USD',
		data: [
			{ id: 1, value: 'usd', label: '$ USD' },
			{ id: 2, value: 'eur', label: '€ EURO' },
		],
		selectedId: 1,
	})
})

// import dateFormatter from './helpers/dateFormatter'
// import store from './store/store'

// import UI from './ui/UI'

// const app = document.getElementById('app')
// const loading = document.querySelector('.loading')
// app.classList.add('d-none')

// window.addEventListener('DOMContentLoaded', () => {
// 	const form = UI.getForm

// 	form.addEventListener('submit', function (e) {
// 		e.preventDefault()

// 		onFormSubmit.bind(this)()
// 	})

// 	async function initApp() {
// 		await store.init()

// 		UI.setData(store.shortCitiesList)
// 		loading.remove()
// 		app.classList.remove('d-none')
// 	}

// 	async function onFormSubmit() {
// 		const dataArr = [...new FormData(this)]
// 		const data = Object.fromEntries(dataArr)
// 		// Code, code, 2019-09, 2019-10
// 		const { origin, destination, departDate, destinationDate } = data

// 		const originCode = store.getCityCodeByKey(origin)
// 		const destinationCode = store.getCityCodeByKey(destination)
// 		const departDateTransformed = dateFormatter(departDate)
// 		const destinationDateTransformed = dateFormatter(destinationDate)

// 		await store.fetchTickets({
// 			origin: originCode,
// 			destination: destinationCode,
// 			depart_date: departDateTransformed,
// 			return_date: destinationDateTransformed,
// 		})
// 	}

// 	initApp()
// })
