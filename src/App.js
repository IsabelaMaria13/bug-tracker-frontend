import "./App.css";
import Authentication from "./Authentication";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Authentication />} /> 
      </Routes>
    </Router>
  );
}

export default App;
