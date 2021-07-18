import { useState } from "react";

const TicketDescription = ({ description }) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<p>
			{showMore || description.length < 200
				? description
				: description.slice(0, 200) + "..."}
			{description.length > 200 && (
				<button
					className="more-less-button"
					onClick={() => setShowMore((prevState) => !prevState)}
				>
					Show {showMore ? "less" : "more"}
				</button>
			)}
		</p>
	);
};

export default TicketDescription;
