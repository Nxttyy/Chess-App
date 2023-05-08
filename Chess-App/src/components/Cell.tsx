import "./Cell.css";

function Cell({ id }) {
	const indexMap = ["a", "c", "e", "g"];

	if (
		(indexMap.includes(id[0]) && id[1] % 2 == 0) ||
		(!indexMap.includes(id[0]) && id[1] % 2 != 0)
	) {
		return (
			<div className="cell border border-secondary text-center light-square">
				{id}
			</div>
		);
	} else {
		return (
			<div className="cell border border-secondary text-center dark-square">
				{id}
			</div>
		);
	}
}

export default Cell;
