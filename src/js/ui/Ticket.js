class Ticket {
	constructor() {
		this.$el = document.querySelector('.tickets-container')
	}

	renderTickets(tickets, symbol) {
		this.clearContainer()

		this.$el.style.padding = '2rem 2rem'

		if (!tickets.length) {
			this.showEmptyMessage()
			return
		}

		let fragment = ''

		tickets.forEach((ticket) => {
			const template = Ticket.ticketTemplate(ticket, symbol)
			fragment += template
		})

		this.$el.insertAdjacentHTML('beforeend', fragment)
	}

	clearContainer() {
		this.$el.innerHTML = ''
	}

	showEmptyMessage() {
		const html = Ticket.emptyMsgTemplate()
		this.$el.insertAdjacentHTML('beforeend', html)
	}

	static emptyMsgTemplate() {
		return `<h2 class="empty-message">Билетов не найдено</h2>`
	}

	static ticketTemplate(ticket, symbol) {
		return `
      <div class="ticket">
        <div class="ticket-header">
          ${
						ticket.airline_logo
							? `<img src="${ticket.airline_logo}" alt="logo" class="ticket__logo"/>`
							: ''
					}
          <span class="ticket__title">
            <span>${ticket.airline_name}</span>
          </span>
        </div>
        <div class="ticket-cities">
          <div class="ticket__city">
            <i class="fas fa-plane-departure"></i>
            <span>${ticket.origin_name}</span>
          </div>
          <div class="ticket__city">
            <i class="fas fa-plane-arrival"></i>
            <span>${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-footer">
          <div class="date">14/01/2022</div>
          <div class="price">${symbol}${ticket.price}</div>
        </div>
      </div>
    `
	}
}

export default new Ticket()
