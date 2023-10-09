import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen"
import Navbar from "./components/Navbar"
import ProductScreen from "./pages/ProductScreen";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";


export default function App() {
  return (
    <Router>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route element = {<HomeScreen/>} path = "/"/>
        <Route element = {<ProductScreen/>} path = "/products/:id"/>
        <Route element = {<ProfileScreen/>} path = "/profile"/>

        <Route element = {<RegisterScreen/>} path="/register"/>
        <Route element = {<LoginScreen/>} path="/login"/>

        <Route element = {<ShippingScreen/>} path="/shipping"/>
        <Route element = {<PaymentScreen/>} path="/payment"/>
        <Route element = {<PlaceOrderScreen/>} path="/place_order"/>
        <Route element = {<OrderScreen/>} path="/orders/:id"/>

      </Routes>
    </Router>
  )
}