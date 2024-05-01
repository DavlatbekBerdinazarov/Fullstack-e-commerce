import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";
import Profile from "./pages/Profile";
import AddAdmin from "./pages/AddAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Login/>}/>
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<AllProducts />} />{" "}
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-admin" element={<AddAdmin/>} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
