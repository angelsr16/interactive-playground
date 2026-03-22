import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { EightPuzzlePage } from "./features/eightpuzzle";
import { Background } from "./components/Background";
import { PathfindingPage } from "./features/pathfinding";
import { Connect4Page } from "./features/connect4";
import { TresEnRayaPage } from "./features/tresenraya";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-void relative">
        <Background />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eightpuzzle" element={<EightPuzzlePage />} />
            <Route path="/pathfinding" element={<PathfindingPage />} />
            <Route path="/connect4" element={<Connect4Page />} />
            <Route path="/tresenraya" element={<TresEnRayaPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
