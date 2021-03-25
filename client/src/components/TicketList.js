import Ticket from "./Ticket";

const TicketList = ({ tickets, onHideClick }) => {
	return (
		<div>
			{tickets.map((ticket, i) => (
				<Ticket key={i} ticket={ticket} onClick={onHideClick} />
			))}
		</div>
	);
};

export default TicketList;
