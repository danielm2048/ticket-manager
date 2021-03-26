import "./App.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TicketList from "./components/TicketList";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Topnav from "./components/Topnav";
import Loader from "./components/Loader";

function App() {
	const [tickets, setTickets] = useState([]);
	const [search, setSearch] = useState("");
	const [hidden, setHidden] = useState({});

	const [showOnlyDone, setShowOnlyDone] = useState(false);

	const [ticketsPerPage] = useState(20);
	const [currentPage, setCurrentPage] = useState(1);

	const [loading, setLoading] = useState(false);

	const onSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const onHideClick = (id) => {
		setHidden({ ...hidden, [id]: !hidden[id] });
	};

	const restore = () => {
		setHidden({});
	};

	const fetchTickets = useCallback(async () => {
		setLoading(true);

		const { data } = await axios.get(
			`/api/tickets?searchText=${search}${showOnlyDone ? "&done=true" : ""}`
		);

		setLoading(false);
		setTickets(data);
		setCurrentPage(1);
	}, [search, showOnlyDone]);

	const deleteTicket = async (id) => {
		try {
			setLoading(true);
			const { data } = await axios.delete(`/api/tickets/${id}`);
			setLoading(false);

			if (data.deleted) {
				setTickets(tickets.filter((ticket) => ticket.id !== id));
			} else {
				alert("Can't delete at the moment... Try again later!!");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const toggleTicketDone = async (id, isDone) => {
		try {
			setLoading(true);
			const { data } = await axios.patch(
				`/api/tickets/${id}/${isDone ? "undone" : "done"}`
			);
			setLoading(false);

			if (data.updated) {
				setTickets(
					tickets.map((ticket) => {
						if (ticket.id === id) {
							ticket.done = !ticket.done;
						}
						return ticket;
					})
				);
			} else {
				alert("Can't mark as done at the moment... Try again later!!");
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);

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
			<Topnav showOnlyDone={showOnlyDone} setShowOnlyDone={setShowOnlyDone} />
			<Search value={search} onChange={onSearchChange} />
			{loading ? (
				<Loader />
			) : (
				<>
					<p style={{ fontStyle: "italic" }}>
						Showing {currentTickets.length} tickets
					</p>
					<div>
						{Object.keys(hidden).length > 0 && (
							<div style={{ fontSize: 18 }}>
								<span id="hideTicketsCounter">
									{Object.keys(hidden).length}{" "}
								</span>
								hidden tickets -{" "}
								<button id="restoreHideTickets" onClick={restore}>
									restore
								</button>
							</div>
						)}
					</div>
					<TicketList
						tickets={currentTickets}
						onHideClick={onHideClick}
						deleteTicket={deleteTicket}
						toggleTicketDone={toggleTicketDone}
					/>
					<Pagination
						perPage={ticketsPerPage}
						total={notHiddenTickets.length}
						paginate={paginate}
						curr={currentPage}
					/>
				</>
			)}
		</div>
	);
}

export default App;
