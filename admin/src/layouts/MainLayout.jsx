import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { Sidebar } from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div>
      <Nav />
      <div className="flex bg-[#eef0f1]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
