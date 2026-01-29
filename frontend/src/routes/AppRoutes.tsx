import { Routes, Route } from "react-router-dom";
import Ocean from "../pages/Ocean"
import AdminLogin from "../pages/AdminLogin";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Ocean />}></Route>
      <Route path="/adminlogin" element={<AdminLogin />}></Route>
      <Route path="/admin" element={<Admin />}></Route>

    </Routes>
  )
}
