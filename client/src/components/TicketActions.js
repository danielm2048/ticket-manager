const TicketActions = ({ done, deleteTicket, toggleTicketDone }) => {
	return (
		<div className="ticket-actions">
			<button className="tooltip" onClick={deleteTicket}>
				🗑️
				<span className="tooltiptext">Delete ticket!</span>
			</button>
			<button className="tooltip" onClick={toggleTicketDone}>
				{done ? "❌" : "✔️"}
				<span className="tooltiptext">
					Click to mark as {done ? "undone" : "done"}
				</span>
			</button>
		</div>
	);
};

export default TicketActions;
