import "./Cell.css";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import DisplayPieces from "./CellHelpers.tsx";

const positionsWithPieces = [];
let selectedPiecePos = "";
const selectedCells = [];
let movableCells = [];
const capturedPieces = [];

function HandleSelection(id, startingPositionMap, setPiecePosition) {
	if (positionsWithPieces.includes(id)) {
		//clicked pos has a piece
		if (selectedPiecePos) {
			MovePieces(
				selectedPiecePos,
				id,
				startingPositionMap,
				setPiecePosition
			);
		} else {
			selectMovableSquares(id);

			selectedPiecePos = id;
		}
		// selectedPiecePos = id;
	} else {
		//no piece on selected square
		if (selectedPiecePos) {
			MovePieces(
				selectedPiecePos,
				id,
				startingPositionMap,
				setPiecePosition
			);
		}
	}

	//highlights the movable squares
}

function MovePieces(
	initialPos,
	finalPos,
	startingPositionMap,
	setPiecePosition
) {
	let piece = "";
	let index;
	let tempArray = [];

	startingPositionMap.forEach((_map) => {
		if (_map[0] == initialPos) {
			index = startingPositionMap.indexOf(_map);
			piece = _map[1];
		}
	});

	if (movableCells.includes(finalPos)) {
		tempArray = startingPositionMap;
		tempArray.splice(index, 1);

		//cature logic and handling
		if (positionsWithPieces.includes(finalPos)) {
			let capturedIndex, capturedPiece;

			startingPositionMap.forEach((_map) => {
				if (_map[0] == finalPos) {
					// console.log(finalPos);
					capturedIndex = startingPositionMap.indexOf(_map);
					capturedPiece = _map[1];

					tempArray.splice(capturedIndex, 1);

					capturedPieces.push([finalPos, capturedPiece]);
					// console.log(mova)
					console.log(
						piece + " captured " + capturedPiece + " at " + finalPos
					);
				}
			});
		}

		tempArray.push([finalPos, piece]);

		setPiecePosition({
			...startingPositionMap,
			piecePositionMap: tempArray,
		});

		selectedPiecePos = "";
		selectedCells.forEach((cell) => {
			cell[1](false);
		});
		movableCells = [];
		// movableCells.splice(movableCells.indexOf(finalPos), 1);
		positionsWithPieces.splice(positionsWithPieces.indexOf(initialPos), 1);

		positionsWithPieces.push(finalPos);
		console.log(
			"moved " + piece + " from " + initialPos + " to " + finalPos
		);
	} else if (positionsWithPieces.includes(finalPos)) {
		selectedPiecePos = "";
		HandleSelection(finalPos, startingPositionMap, setPiecePosition);
	} else {
		selectedPiecePos = "";
		selectedCells.forEach((cell) => {
			cell[1](false);
		});
		movableCells = [];
	}
}

function DisplayPieces({ id, startingPositionMap }) {
	let matches = false;
	let piece = "";

	startingPositionMap.forEach((pos) => {
		if (pos[0] == id) {
			matches = true;
			piece = pos[1];

			if (!positionsWithPieces.includes(id)) {
				positionsWithPieces.push(id);
			}
		}
	});
	if (matches) {
		return <img src={"../assets/images/" + piece + ".png"} alt="" />;
	}
}

function Cell(classname, onClick, id, isSelected, startingPositionMap) {
	const indexMap = ["a", "c", "e", "g"];

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
		</div>
	);
}

function selectMovableSquares(id) {
	movableCells = [];
	const helper = ["a", "b", "c", "d", "e", "f", "g", "h"];
	let positive = false;
	let negative = false;
	const dist = [];
	let pL = [];

	for (let item of selectedCells) {
		if (
			item[0][0] == id[0] || 
			// movableCells.includes(item[0]))
		) {
			movableCells.push(item[0]);
			pL.push(item[0]);
			item[1](true);
		} else {
			item[1](false);
		}
	}

	// //remove duplicates from pL
	// pL.forEach((p) => {
	// 	pL.forEach((p2) => {
	// 		if (p == p2) {
	// 			// console.log();
	// 			pL.splice(pL.indexOf(p2), 1);
	// 		}
	// 	});
	// });
	// console.log(pL);
	// //unselect blocked(invisible) pieces
	// const unselectHiddenPieces = (positionList) => {
	// 	// console.log(positionList);
	// 	const dist2 = [];

	// 	positionList.forEach((pos) => {
	// 		if (positionsWithPieces.includes(pos)) {
	// 			// console.log("2");
	// 			dist.push(Number(pos[1] - id[1]));
	// 			dist2.push([Number(pos[1] - id[1]), pos]);
	// 		}
	// 	});

	// 	dist.sort();
	// 	console.log(dist);
	// 	for (let d of dist) {
	// 		console.log(d);
	// 		if (!negative && d < 0) {
	// 			dist.splice(dist.indexOf(d), 1);
	// 			// console.log(d);
	// 			negative = true;
	// 		} else if (!positive && d > 0) {
	// 			dist.splice(dist.indexOf(d), 1);
	// 			// console.log(d);

	// 			positive = true;
	// 		} else if (d == 0) {
	// 			dist.splice(dist.indexOf(d), 1);
	// 			// console.log(d);
	// 		}
	// 	}

	// 	dist.forEach((d) => {
	// 		// console.log(d);
	// 	});
	// 	console.log(dist);

	// 	// console.log(dist);
	// 	// console.log(dist2);
	// 	dist2.forEach((d2) => {
	// 		// console.log(d2);
	// 		if (dist.includes(d2[0])) {
	// 			// console.log("3");
	// 			// console.log(d2[1]);
	// 			selectedCells.forEach((c) => {
	// 				if (c[0] == d2[1]) {
	// 					c[1](false);
	// 				}
	// 			});
	// 			movableCells.splice(movableCells.indexOf(d2[1]), 1);
	// 		}
	// 	});
	// };

	// unselectHiddenPieces(pL);
	// pL = [];
}

function CellDiv({ id, startingPositionMap, setPiecePosition }) {
	const [isSelected, setIsSelected] = useState(false);
	let classname = "";

	selectedCells.push([id, setIsSelected]);
	// console.log(selectedCells);
	const removeItem = (arr, item) => {
		let index = arr.indexOf(item);
		arr.splice(index, 1);
		return arr;
	};

	const _onClick = () => {
		HandleSelection(id, startingPositionMap, setPiecePosition);
	};

	// console.log(selectedCells, id);
	if (isSelected) {
		classname = "cell border border-secondary text-center clicked";
	} else {
		classname = "cell border border-secondary text-center";
	}

	return Cell(classname, _onClick, id, isSelected, startingPositionMap);
}

export default CellDiv;
