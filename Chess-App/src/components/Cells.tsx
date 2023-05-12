import "./Cell.css";
import { useState, componentDidUpdate } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
	id: String;
}

interface Props2 {
	classname: String;
	onClick: () => Null;
	id: String;
	isSelected: Bool;
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

const indexMap = ["a", "c", "e", "g"];

function MovePieces(initialPos, finalPos, setRefresh) {
	console.log(initialPos, finalPos);
	let piece;

	let index = startingPosition.indexOf(initialPos);
	startingPosition.splice(index, 1);

	startingPositionMap.forEach((pos) => {
		if (pos[0] == initialPos) {
			index = startingPositionMap.indexOf(pos);
			piece = pos[1];
		}
	});
	// index = startingPositionMap.indexOf(initialPos);
	startingPositionMap.splice(index, 1);

	startingPosition.push(finalPos);
	startingPositionMap.push([finalPos, piece]);
	// setRefresh("a");
	console.log("moved " + piece + " from " + initialPos + " to " + finalPos);
}

function DisplayPieces({ id, startingPositionMap }) {
	let value = "";
	if (startingPosition.includes(id)) {
		startingPositionMap.forEach((pos) => {
			if (pos[0] == id) {
				value = pos[1];
			}
		});
		return <img src={"../assets/images/" + value + ".png"} alt="" />;
	} else {
		return <></>;
	}
}

function Cell({
	classname,
	onClick,
	id,
	isSelected,
	startingPositionMap,
}: Props2) {
	console.log(classname);
	console.log(id);
	if (
		(indexMap.includes(id[0]) && id[1] % 2 == 0) ||
		(!indexMap.includes(id[0]) && id[1] % 2 != 0)
	) {
		classname += " light-square";
	} else {
		classname += " dark-square";
	}
	return (
		<div className={classname} onClick={onClick}>
			<DisplayPieces id={id} startingPositionMap={startingPositionMap} />
			{/*{clicked({ isSelected })}*/}

			{/*<i class="fa-solid fa-circle circle"></i>{" "}*/}
		</div>
	);
}

const selectedCells = [];
let selectedPiecePos = "";
export default function CellDiv({ id, startingPositionMap }) {
	//refreshs the components after selectedCells changes
	// const [refresh, setRefresh] = useState("");
	console.log(id);
	console.log("A");
	const [isSelected, setIsSelected] = useState(false);
	let classname = "";

	selectedCells.push([id, setIsSelected]);
	console.log(selectedCells);
	const removeItem = (arr, item) => {
		let index = arr.indexOf(item);
		arr.splice(index, 1);
		return arr;
	};

	const helper = ["a", "b", "c", "d", "e", "f", "g", "h"];

	const handleSelection = (id) => {
		if (startingPosition.includes(id)) {
			selectedPiecePos = id;
		} else if (selectedPiecePos) {
			// console.log(selectedPiecePos, id);
			MovePieces(selectedPiecePos, id, setRefresh);
		}
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
	// console.log(
	// 	<Cell
	// 		classname={classname}
	// 		onClick={_onClick}
	// 		id={id}
	// 		isSelected={isSelected}
	// 	/>
	// );
	return (
		<Cell
			classname={classname}
			onClick={_onClick}
			id={id}
			isSelected={isSelected}
			startingPositionMap={startingPositionMap}
		/>
	);
}

function Cells({ id }: Props) {
	return <CellDiv id={id} />;
}

// export default Cells;
