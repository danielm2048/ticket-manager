const Search = ({ value, onChange }) => {
	return (
		<div>
			<input id="searchInput" value={value} onChange={onChange} />
		</div>
	);
};

export default Search;
