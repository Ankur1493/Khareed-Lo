import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen"
import Navbar from "./components/Navbar"
import ProductScreen from "./pages/ProductScreen";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <Router>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route element = {<HomeScreen/>} path = "/"/>
        <Route element = {<ProductScreen/>} path = "products/:id"/>

        <Route element = {<RegisterScreen/>} path="/register"/>
        <Route element = {<LoginScreen/>} path="/login"/>
      </Routes>
    </Router>
  )
}