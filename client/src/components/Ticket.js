import TicketActions from "./TicketActions";
import TicketDescription from "./TicketDescription";

const Ticket = ({ ticket, onClick, deleteTicket, toggleTicketDone }) => {
	let date = new Date(ticket.creationTime);
	date = date.toDateString() + " " + date.toISOString().slice(11, 16);
	return (
		<div className="ticket">
			<h3>{ticket.title}</h3>
			<TicketDescription description={ticket.content} />
			<div className="extra-ticket-info">
				<span className="ticket-user-email">From: {ticket.userEmail}</span>
				<span>{date}</span>
				<div className="labels">
					{ticket.labels &&
						ticket.labels.map((label, i) => (
							<span className="label" key={i}>
								{label}
							</span>
						))}
				</div>
			</div>
			<button className="hideTicketButton" onClick={() => onClick(ticket.id)}>
				Hide
			</button>
			<TicketActions
				done={ticket.done}
				deleteTicket={() => deleteTicket(ticket.id)}
				toggleTicketDone={() => toggleTicketDone(ticket.id, ticket.done)}
			/>
		</div>
	);
};

export default Ticket;
