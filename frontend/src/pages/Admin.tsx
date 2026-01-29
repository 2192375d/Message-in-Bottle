import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/admin/", { credentials: "include" });
      const data = await res.json();
      if (!data.is_admin) navigate("/adminlogin");
    }
    checkAuth();
  }, [navigate]);

  return <h1>ADMIN</h1>;
}
