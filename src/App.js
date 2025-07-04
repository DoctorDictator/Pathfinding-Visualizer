import logo from "./logo.svg";
import "./App.css";
import "./output.css";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import { Wrapper } from "./wrapper";

function App() {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Board />
      </Wrapper>
    </>
  );
}

export default App;
