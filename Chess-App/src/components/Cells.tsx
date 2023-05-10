import "./Cell.css";
import { useState, componentDidUpdate } from "react";

interface Props {
	id: String;
}

interface Props2 {
	classname: String;
	onClick: () => Null;
	id: String;
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

const indexMap = ["a", "c", "e", "g"];

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
function Cell({ classname, onClick, id }: Props2) {
	// console.log(classname);
	if (
		(indexMap.includes(id[0]) && id[1] % 2 == 0) ||
		(!indexMap.includes(id[0]) && id[1] % 2 != 0)
	) {
		return (
			<div className={classname + " light-square"} onClick={onClick}>
				<DisplayPieces id={id} />
			</div>
		);
	} else {
		return (
			<div className={classname + " dark-square"} onClick={onClick}>
				<DisplayPieces id={id} />
			</div>
		);
	}
}

const selectedCells = [];

function Cells({ id }: Props) {
	return <CellDiv id={id} />;
}

function CellDiv({ id }) {
	//refreshs the components after selectedCells changes
	const [refresh, setRefresh] = useState("");
	const [isSelected, setIsSelected] = useState(false);
	let classname = "";

	selectedCells.push([id, setIsSelected]);

	const removeItem = (arr, item) => {
		let index = arr.indexOf(item);
		arr.splice(index, 1);
		return arr;
	};

	const helper = ["a", "b", "c", "d", "e", "f", "g", "h"];

	const handleSelection = (id) => {
		for (let i = 1; i < 9; i++) {
			selectedCells.forEach((item) => {
				if (
					item[0][0] == id[0] ||
					item[0][1] == id[1] ||
					helper.indexOf(item[0][0]) - Number(id[1]) ==
						helper.indexOf(id[0]) - Number(item[0][1]) ||
					helper.indexOf(item[0][0]) - helper.indexOf(id[0]) ==
						Number(item[0][1]) - Number(id[1])
				) {
					item[1](true);
				} else {
					item[1](false);
				}
			});
		}
		// setIsSelected(true);
	};

	const _onClick = () => {
		handleSelection(id);
	};

	// console.log(selectedCells, id);
	if (isSelected) {
		classname = "cell border border-secondary text-center clicked";
	} else {
		classname = "cell border border-secondary text-center";
	}

	return <Cell classname={classname} onClick={_onClick} id={id} />;
}

export default Cells;
