const TicketActions = ({ done }) => {
	return (
		<div className="ticket-actions">
			<button className="tooltip">
				🗑️
				<span className="tooltiptext">Delete ticket!</span>
			</button>
			<button className="tooltip">
				{done ? "❌" : "✔️"}
				<span className="tooltiptext">
					Click to mark as {done ? "undone" : "done"}
				</span>
			</button>
		</div>
	);
};

export default TicketActions;
