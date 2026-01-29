import { Routes, Route } from "react-router-dom";
import Ocean from "../pages/Ocean"
import AdminLogin from "../pages/AdminLogin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Ocean />}></Route>
      <Route path="/adminlogin" element={<AdminLogin />}></Route>

    </Routes>
  )
}
