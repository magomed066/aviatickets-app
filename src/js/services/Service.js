import config from '../config/config'

/*
  /countries - 
  /cities -
  /prices -
*/

class Service {
	constructor(config) {
		this.url = config.url
	}

	async request(
		url = this.url,
		method = 'GET',
		body,
		headers = { 'Content-type': 'application/json' },
	) {
		const res = await fetch(url, {
			method,
			headers,
			body,
		})

		if (!res.ok) {
			throw new Error(`Could not fetch url: ${url}, status: ${res.status}`)
		}

		return await res.json()
	}

	async getCountries() {
		try {
			const response = await this.request(`${this.url}/countries`)

			return response
		} catch (err) {
			console.log(err)
			return Promise.reject(err)
		}
	}

	async getCities() {
		try {
			const response = await this.request(`${this.url}/cities`)

			return response
		} catch (err) {
			console.log(err)
			return Promise.reject(err)
		}
	}

	async getPrices(params) {
		try {
			let url = new URL(`${this.url}/prices/cheap`)
			Object.keys(params).forEach((key) =>
				url.searchParams.append(key, params[key]),
			)

			const response = await this.request(url)

			return response
		} catch (err) {
			console.log(err)
			return Promise.reject(err)
		}
	}
}

export default new Service(config)
