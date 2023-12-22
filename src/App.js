import "./App.css";
import Authentication from "./Authentication";
import Register from "./Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Authentication />} /> 
       <Route path="/home" element={<Home/>}/>
       <Route path="/register" element = {<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
