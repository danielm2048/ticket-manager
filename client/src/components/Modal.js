import { useEffect, useRef, useState } from "react";
import AddTicket from "./AddTicket";

const Modal = ({ formSubmit }) => {
	const [open, setOpen] = useState(false);

	const handleClickOutdside = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setOpen(false);
		}
	};

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutdside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutdside);
		};
	}, [ref]);

	return (
		<>
			<button onClick={() => setOpen(true)} id="modal-button">
				➕
			</button>

			<div
				id="myModal"
				className="modal"
				style={{ display: open ? "block" : "none" }}
			>
				<div className="modal-content" ref={ref}>
					<div>
						<span className="close" onClick={() => setOpen(false)}>
							&times;
						</span>
						<h1>Add Ticket!</h1>
					</div>
					<div className="modal-body">
						<AddTicket addTicket={formSubmit} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
