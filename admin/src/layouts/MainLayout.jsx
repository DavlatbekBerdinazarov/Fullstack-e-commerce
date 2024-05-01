import React, { createContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";

export const AdminPanelContext = createContext();

export default function MainLayout() {
  const [admin, setAdmin] = useState('admin name');
  const [adminId, setAdminId] = useState(null);
  const [profImg, setProfImg] = useState('https://docs.material-tailwind.com/img/face-2.jpg');

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let loggedAdmin = JSON.parse(localStorage.getItem('admin'));
    let loggedAdminImage = JSON.parse(localStorage.getItem('adminImg'));
    const id = JSON.parse(localStorage.getItem('id'));
    if (loggedAdmin) {
      setAdmin(loggedAdmin);
      setProfImg(`http://localhost:4545/${loggedAdminImage}`);
      setAdminId(id);
    }
    else {
      navigate('/');
    }
  },[location]);


  console.log('adminImg', profImg);

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminImg");

    // Redirect to login page
    window.location.href = "/";
  };


  return (
    <AdminPanelContext.Provider value={{ admin, handleLogout, profImg, adminId }}>
      <Nav />
      <div className="flex bg-[#eef0f1]">
        <Sidebar />
        <Outlet />
      </div>
    </AdminPanelContext.Provider>
  );
}
