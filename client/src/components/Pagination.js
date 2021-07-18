const Pagination = ({ perPage, total, paginate, curr }) => {
	const pageNumbers = [];

	const maxPages = Math.ceil(total / perPage);

	if (maxPages === 0) {
		return <h1>Nothing to show!</h1>;
	}

	for (let i = 1; i <= maxPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="pagination">
			<button onClick={() => (curr > 1 ? paginate(--curr) : null)}>
				&laquo;
			</button>
			{pageNumbers.map((p) => (
				<button
					key={p}
					onClick={() => paginate(p)}
					className={curr === p ? "active" : ""}
				>
					{p}
				</button>
			))}
			<button onClick={() => (curr < maxPages ? paginate(++curr) : null)}>
				&raquo;
			</button>
		</div>
	);
};

export default Pagination;
