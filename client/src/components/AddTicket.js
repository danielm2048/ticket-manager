import { useState } from "react";
import TagsInput from "./TagsInput";

const AddTicket = ({ addTicket }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [labels, setLabels] = useState([]);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		addTicket(title, content, userEmail, labels);
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<label htmlFor="title">Title:</label>
			<input
				id="title"
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				onKeyPress={(e) => {
					e.key === "Enter" && e.preventDefault();
				}}
				required
			/>

			<label htmlFor="content">Content:</label>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			></textarea>

			<label htmlFor="user-email">User Email:</label>
			<input
				id="user-email"
				type="email"
				value={userEmail}
				onChange={(e) => setUserEmail(e.target.value)}
				onKeyPress={(e) => {
					e.key === "Enter" && e.preventDefault();
				}}
				required
			/>

			<TagsInput tags={labels} setTags={setLabels} />

			<button type="submit" className="action-button">
				Let's get to work!
			</button>
		</form>
	);
};

export default AddTicket;
