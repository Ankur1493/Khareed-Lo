import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen"
import Navbar from "./components/Navbar"
import ProductScreen from "./pages/ProductScreen";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route element = {<HomeScreen/>} path = "/"/>
        <Route element = {<ProductScreen/>} path = "products/:id"/>
      </Routes>
    </Router>
  )
}