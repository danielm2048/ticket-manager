const TagsInput = ({ tags, setTags }) => {
	const addTags = (e) => {
		e.preventDefault();
		if (e.target.value !== "" && tags.length < 3) {
			setTags([...tags, e.target.value]);
		}
		e.target.value = "";
	};

	const removeTag = (index) => {
		setTags(tags.filter((_, i) => i !== index));
	};

	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, i) => (
					<li key={i} className="tag">
						<span className="tag-title">{tag}</span>
						<span className="tag-close-icon" onClick={() => removeTag(i)}>
							&times;
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				placeholder="Press enter to add up to three labels"
				onKeyPress={(e) => (e.key === "Enter" ? addTags(e) : null)}
			/>
		</div>
	);
};

export default TagsInput;
