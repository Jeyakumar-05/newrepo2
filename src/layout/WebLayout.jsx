import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const WebLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-blue-700 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} SmartInsure. All rights reserved.
      </footer>
    </div>
  );
};

export default WebLayout;
