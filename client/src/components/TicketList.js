import Ticket from "./Ticket";

const TicketList = ({ tickets, hidden, onHideClick }) => {
	return (
		<div>
			{tickets.reduce((accu, curr, i) => {
				if (!hidden[curr.id]) {
					accu.push(<Ticket key={i} ticket={curr} onClick={onHideClick} />);
				}
				return accu;
			}, [])}
		</div>
	);
};

export default TicketList;
