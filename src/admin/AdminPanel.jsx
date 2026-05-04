import { useState } from "react";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";
import Customers from "./Customers";
import Settings from "./Settings";

export default function AdminPanel({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    orders:    <Orders />,
    products:  <Products />,
    customers: <Customers />,
    settings:  <Settings />,
  };

  return (
    <AdminLayout activePage={activePage} onNavigate={setActivePage} onLogout={onLogout}>
      {pages[activePage]}
    </AdminLayout>
  );
}
