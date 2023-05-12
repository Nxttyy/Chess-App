import "./App.css";
import Board from "./components/Board.tsx";
// import Cells from "./components/Cells.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="main-container">
      <Board />
    </div>
  );
}

export default App;
