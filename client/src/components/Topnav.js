import logo from "../logo.png";

const Topnav = ({ showOnlyDone, setShowOnlyDone }) => {
	return (
		<nav className="topnav">
			<div className="centered">
				<div>
					<img src={logo} alt="ticket manager logo" />
				</div>
				<button onClick={() => setShowOnlyDone((prevState) => !prevState)}>
					{showOnlyDone ? "Show Every Ticket" : "Show Only Done Tickets"}
				</button>
			</div>
		</nav>
	);
};

export default Topnav;
