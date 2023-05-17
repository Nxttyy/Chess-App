import "./Board.css";
import CellDiv from "./Cells.tsx";
// import Cell from "Cell.tsx";
import { useState } from "react";

interface Prop {
	// children:;
}

function Board() {
	const [piecePosition, setPiecePosition] = useState({
		piecePositionMap: [
			["a1", "White-Rook"],
			["b1", "White-Knight"],
			["c1", "White-Bishop"],
			["d1", "White-Queen"],
			["e1", "White-King"],
			["f1", "White-Bishop"],
			["g1", "White-Knight"],
			["h1", "White-Rook"],
			["a2", "White-Pawn"],
			["b2", "White-Pawn"],
			["c2", "White-Pawn"],
			["d2", "White-Pawn"],
			["e2", "White-Pawn"],
			["f2", "White-Pawn"],
			["g2", "White-Pawn"],
			["h2", "White-Pawn"],

			["a8", "Black-Rook"],
			["b8", "Black-Knight"],
			["c8", "Black-Bishop"],
			["d8", "Black-Queen"],
			["e8", "Black-King"],
			["f8", "Black-Bishop"],
			["g8", "Black-Knight"],
			["h8", "Black-Rook"],
			["a7", "Black-Pawn"],
			["b7", "Black-Pawn"],
			["c7", "Black-Pawn"],
			["d7", "Black-Pawn"],
			["e7", "Black-Pawn"],
			["f7", "Black-Pawn"],
			["g7", "Black-Pawn"],
			["h7", "Black-Pawn"],
		],
	});
	const ranks = [1, 2, 3, 4, 5, 6, 7, 8];
	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

	const cells = [];
	let id = "";

	//generate all cells
	for (let i = 7; i >= 0; i--) {
		for (let j = 0; j < 8; j++) {
			cells.push(files[j] + ranks[i]);
		}
	}

	// cells.reverse();
	// console.log(piecePosition.piecePositionMap);
	return (
		<div className=" container position-relative top-50 start-50 translate-middle board border-dark shadow-lg">
			{cells.map((cell) => {
				return (
					<CellDiv
						key={cell}
						id={cell}
						startingPositionMap={piecePosition.piecePositionMap}
						setPiecePosition={setPiecePosition}
					/>
				);
			})}
		</div>
	);
}

export default Board;
