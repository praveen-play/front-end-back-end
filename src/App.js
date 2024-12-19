import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Bill from "./components/bill/Bill";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserManagement from "./components/userManagement/UserManagement";
import Customer from "./components/customer/Customer";
import Item from "./components/item/Item";
import Stock from "./components/stock/Stock";
import Reprint from "./components/reprint/Reprint";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    }); // Initialize AOS
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/settings" element={<UserManagement />}></Route>
              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/item" element={<Item />}></Route>
              <Route path="/stock" element={<Stock />}></Route>
              <Route path="/reprint" element={<Reprint />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/bill" element={<Bill />}></Route>
            </Route>

            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </AuthProvider>
    </div>
  );
}

export default App;
