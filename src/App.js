import "./App.css";
import Authentication from "./Authentication";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { UserProvider } from "./UserContext";
import AddBug from "./AddBug";

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
       <Route path="/" element={<Authentication />} /> 
       <Route path="/home" element={<Home/>}/>
       <Route path="addBug" element={<AddBug/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
