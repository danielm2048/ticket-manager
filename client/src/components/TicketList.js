import Ticket from "./Ticket";

const TicketList = ({
	tickets,
	onHideClick,
	deleteTicket,
	toggleTicketDone,
}) => {
	return (
		<div>
			{tickets.map((ticket, i) => (
				<Ticket
					key={i}
					ticket={ticket}
					onClick={onHideClick}
					deleteTicket={deleteTicket}
					toggleTicketDone={toggleTicketDone}
				/>
			))}
		</div>
	);
};

export default TicketList;
