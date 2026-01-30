import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
//import axios from "axios";


function App() {
  

  return (
    <div>
     <Navbar />
     <Body />
    </div>
  )
}

export default App;