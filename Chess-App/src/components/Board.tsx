import "./Board.css";
// import Cell from "Cell.tsx";

function Board({ children }) {
	return (
		<div className=" container position-absolute top-50 start-50 translate-middle board border-dark shadow-lg">
			{children}
		</div>
	);
}

export default Board;
