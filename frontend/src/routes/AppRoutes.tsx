import { Routes, Route } from "react-router-dom";
import Ocean from "../pages/Ocean"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Ocean />}></Route>
    </Routes>
  )
}
