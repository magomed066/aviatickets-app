import service from '../services/Service'

class Store {
	constructor(service) {
		this.service = service
		this.countries = null
		this.cities = null
		this.shortCitiesList = null
		this.lastSearch = {}
		this.airlines = {}
	}

	async init() {
		const response = await Promise.all([
			this.service.getCountries(),
			this.service.getCities(),
			this.service.getAirlines(),
		])

		const [countries, cities, airlines] = response
		this.countries = this.serializeCountries(countries)
		this.cities = this.serializeCities(cities)
		this.shortCitiesList = this.createShortCitiesList(this.cities)
		this.airlines = this.serializeAirlines(airlines)

		console.log(this.cities)

		return response
	}

	serializeCities(cities) {
		return cities.reduce((acc, city) => {
			const country_name = this.countries[city.country_code].name
			city.name = city.name || city.name_translations.en
			const full_name = `${city.name},${country_name}`

			acc[city.code] = { ...city, full_name, country_name }

			return acc
		}, {})
	}

	serializeAirlines(airlines) {
		return airlines.reduce((acc, item) => {
			item.logo = `https://pics.avs.io/200/200/${item.code}.png`
			item.name = item.name || item.name_translations.en

			acc[item.code] = item

			return acc
		}, {})
	}

	getAirlineNameByCode(code) {
		return this.airlines[code] ? this.airlines[code].name : ''
	}

	getAirlineLogoByCode(code) {
		return this.airlines[code] ? this.airlines[code].logo : ''
	}

	getCityCodeByKey(key) {
		const city = Object.values(this.cities).find(
			(item) => item.full_name === key,
		)

		return city.code
	}

	getCityNameByCode(code) {
		return this.cities[code].name
	}

	createShortCitiesList(cities) {
		return Object.entries(cities).reduce((acc, [, city]) => {
			acc[city.full_name] = null
			return acc
		}, {})
	}

	serializeCountries(countries) {
		// {'County code' : {...}}
		return countries.reduce((acc, country) => {
			acc[country.code] = country

			return acc
		}, {})
	}

	getCitiesByCountryCode(code) {
		return this.cities.filter((city) => city.country_code === code)
	}

	async fetchTickets(params) {
		const response = await this.service.getPrices(params)
		this.lastSearch = this.serializeTickets(response.data)
		// console.log(response)
		console.log(this.lastSearch)
	}

	serializeTickets(tickets) {
		return Object.values(tickets).map((ticket) => {
			return {
				...ticket,
				origin_name: this.getCityNameByCode(ticket.origin),
				destination_name: this.getCityNameByCode(ticket.destination),
				airline_logo: this.getAirlineLogoByCode(ticket.airline),
				airline_name: this.getAirlineNameByCode(ticket.airline),
			}
		})
	}
}

export default new Store(service)
