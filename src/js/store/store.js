import service from '../services/Service'

class Store {
	constructor(service) {
		this.service = service
		this.countries = null
		this.cities = null
		this.shortCitiesList = null
	}

	async init() {
		const response = await Promise.all([
			this.service.getCountries(),
			this.service.getCities(),
		])

		const [countries, cities] = response
		this.countries = this.serializeCountries(countries)
		this.cities = this.serializeCities(cities)

		this.shortCitiesList = this.createShortCitiesList(this.cities)

		return response
	}

	serializeCities(cities) {
		// {'City name, Country name' : {...} }
		return cities.reduce((acc, city) => {
			const country_name = this.getCountyNameByCityCode(city.country_code)
			const city_name = city.name || city.name_translation.en
			const key = `${city_name},${country_name}`

			acc[key] = city

			return acc
		}, {})
	}

	getCityCodeByKey(key) {
		return this.cities[key].code
	}

	getCountyNameByCityCode(code) {
		return this.countries[code].name
	}

	createShortCitiesList(cities) {
		return Object.entries(cities).reduce((acc, [key]) => {
			acc[key] = null

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
		console.log(response)
	}
}

export default new Store(service)
