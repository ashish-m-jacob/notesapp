import Home from "./pages/Home";
import Notes from "./pages/Notes";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
