const Ticket = ({ ticket, onClick }) => {
	return (
		<div className="ticket">
			<span>Title: {ticket.title}</span>
			<p>Content: {ticket.content}</p>
			<span>Created At: {ticket.creationTime}</span>
			<span>User Email: {ticket.userEmail}</span>
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
