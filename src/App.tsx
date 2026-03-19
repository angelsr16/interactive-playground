import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { EightPuzzlePage } from "./features/eightpuzzle";
import { Background } from "./components/Background";

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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
