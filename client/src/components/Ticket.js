import TicketDescription from "./TicketDescription";

const Ticket = ({ ticket, onClick }) => {
	let date = new Date(ticket.creationTime);
	date = date.toDateString() + " " + date.toISOString().slice(11, 16);
	return (
		<div className="ticket">
			<h3>{ticket.title}</h3>
			<TicketDescription description={ticket.content} />
			<div className="extra-ticket-info">
				<span className="ticket-user-email">From: {ticket.userEmail}</span>
				<span>{date}</span>
			</div>
			<div>
				{ticket.labels &&
					ticket.labels.map((label, i) => (
						<span className="label" key={i}>
							{label}
						</span>
					))}
			</div>
			<button className="hideTicketButton" onClick={() => onClick(ticket.id)}>
				Hide
			</button>
		</div>
	);
};

export default Ticket;
