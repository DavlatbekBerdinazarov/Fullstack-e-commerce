import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Login/>}/>
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<AllProducts />} />{" "}
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
          <Route path="*" element={<NotFound to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
