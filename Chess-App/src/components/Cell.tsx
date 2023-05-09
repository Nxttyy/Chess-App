import "./Cell.css";
import { useState } from "react";

interface Props {
	id: Strign;
}

const startingPosition = [
	"a1",
	"b1",
	"c1",
	"d1",
	"e1",
	"f1",
	"g1",
	"h1",
	"a8",
	"b8",
	"c8",
	"d8",
	"e8",
	"f8",
	"g8",
	"h8",
	"a2",
	"b2",
	"c2",
	"d2",
	"e2",
	"f2",
	"g2",
	"h2",
	"a7",
	"b7",
	"c7",
	"d7",
	"e7",
	"f7",
	"g7",
	"h7",
];
const startingPositionMap = {
	a1: "White-Rook",
	b1: "White-Knight",
	c1: "White-Bishop",
	d1: "White-Queen",
	e1: "White-King",
	f1: "White-Bishop",
	g1: "White-Knight",
	h1: "White-Rook",
	a2: "White-Pawn",
	b2: "White-Pawn",
	c2: "White-Pawn",
	d2: "White-Pawn",
	e2: "White-Pawn",
	f2: "White-Pawn",
	g2: "White-Pawn",
	h2: "White-Pawn",

	a8: "Black-Rook",
	b8: "Black-Knight",
	c8: "Black-Bishop",
	d8: "Black-Queen",
	e8: "Black-King",
	f8: "Black-Bishop",
	g8: "Black-Knight",
	h8: "Black-Rook",
	a7: "Black-Pawn",
	b7: "Black-Pawn",
	c7: "Black-Pawn",
	d7: "Black-Pawn",
	e7: "Black-Pawn",
	f7: "Black-Pawn",
	g7: "Black-Pawn",
	h7: "Black-Pawn",
};

function DisplayPieces({ id }) {
	if (startingPosition.includes(id)) {
		return (
			<img
				src={
					"../assets/images/" + `${startingPositionMap[id]}` + ".png"
				}
				alt=""
			/>
		);
	}
}
function Cell({ id }: Props) {
	const indexMap = ["a", "c", "e", "g"];

	const [selected, setSelected] = useState("");

	if (
		(indexMap.includes(id[0]) && id[1] % 2 == 0) ||
		(!indexMap.includes(id[0]) && id[1] % 2 != 0)
	) {
		return (
			<div
				className={
					"cell border border-secondary text-center light-square " +
					`${selected}`
				}
				onClick={() => {
					setSelected("clicked");
				}}
			>
				<DisplayPieces id={id} />
			</div>
		);
	} else {
		return (
			<div
				className={
					"cell border border-danger dark-square text-center " +
					`${selected}`
				}
				onClick={() => {
					setSelected("clicked");
				}}
			>
				<DisplayPieces id={id} />
			</div>
		);
	}
}

export default Cell;
