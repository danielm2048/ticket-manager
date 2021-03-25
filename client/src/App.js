import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./components/TicketList";
import Search from "./components/Search";

function App() {
	const [tickets, setTickets] = useState([]);
	const [search, setSearch] = useState("");
	const [hidden, setHidden] = useState({});

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

	return (
		<div className="App">
			<Search value={search} onChange={onSearchChange} />
			<div>
				{Object.keys(hidden).length > 0 && (
					<div>
						<span id="hideTicketsCounter">{Object.keys(hidden).length}</span>
						hidden tickets -
						<button id="restoreHideTickets" onClick={restore}>
							restore
						</button>
					</div>
				)}
			</div>
			<TicketList tickets={tickets} hidden={hidden} onHideClick={onHideClick} />
		</div>
	);
}

export default App;
