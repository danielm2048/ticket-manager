import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./components/TicketList";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

function App() {
	const [tickets, setTickets] = useState([]);
	const [search, setSearch] = useState("");
	const [hidden, setHidden] = useState({});

	const [ticketsPerPage] = useState(20);
	const [currentPage, setCurrentPage] = useState(1);

	const onSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const onHideClick = (id) => {
		setHidden({ ...hidden, [id]: !hidden[id] });
	};

	const restore = () => {
		setHidden({});
	};

	useEffect(() => {
		const fetchTickets = async () => {
			const { data } = await axios.get(`/api/tickets?searchText=${search}`);

			setTickets(data);
		};

		fetchTickets();
	}, [search]);

	const notHiddenTickets = tickets.filter((ticket) => !hidden[ticket.id]);

	const indexOfLastTicket = currentPage * ticketsPerPage;
	const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
	const currentTickets = notHiddenTickets.slice(
		indexOfFirstTicket,
		indexOfLastTicket
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	return (
		<div className="App">
			<h1>Manage your tickets!</h1>
			<Search value={search} onChange={onSearchChange} />
			<p>Showing {currentTickets.length} tickets</p>
			<div>
				{Object.keys(hidden).length > 0 && (
					<div>
						<span id="hideTicketsCounter">{Object.keys(hidden).length} </span>
						hidden tickets -
						<button id="restoreHideTickets" onClick={restore}>
							restore
						</button>
					</div>
				)}
			</div>
			<TicketList tickets={currentTickets} onHideClick={onHideClick} />
			<Pagination
				perPage={ticketsPerPage}
				total={notHiddenTickets.length}
				paginate={paginate}
				curr={currentPage}
			/>
		</div>
	);
}

export default App;
