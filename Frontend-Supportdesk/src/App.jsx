import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import NewTicket from "./pages/NewTicket";
import PrivateRoutes from "./component/PrivateRoutes";
import AllTickets from "./pages/AllTickets";
import Ticket from "./pages/Ticket";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="*" element={PageNotFound} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ticket" element={<PrivateRoutes/>}>
          <Route path="new" element={<NewTicket/>}/>
          <Route path="my-tickets" element={<AllTickets/>}/>
          <Route path=":id" element={<Ticket/>}/>
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
