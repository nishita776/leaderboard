import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
