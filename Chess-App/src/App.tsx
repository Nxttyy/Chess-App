import "./App.css";
import Board from "./components/Board.tsx";
import Cells from "./components/Cells.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

function App() {
  const ranks = [1, 2, 3, 4, 5, 6, 7, 8];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const cells = [];

  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      cells.push(files[j] + ranks[i]);
    }
  }

  return (
    <div className="main-container">
      <Board>
        {cells.flat().map((cell) => {
          return <Cells id={cell} key={cell} />;
        })}
      </Board>
    </div>
  );
}

export default App;
