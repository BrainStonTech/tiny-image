import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Routes
import Home from "./routes/Home";
// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Router>
      <Navbar />
        <div className="page_body">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" exact element={<h1>About</h1>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
