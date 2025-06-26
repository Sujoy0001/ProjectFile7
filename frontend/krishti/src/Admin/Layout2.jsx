// src/components/Layout2.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./Navbar";
import Footer from "../components/Footer";

export default function Layout2() {
  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
