import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Post } from "../types/types.tsx"

export default function Admin() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function deletePost(id: number) {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error(`DELETE /api/posts failed: ${res.status}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function load(signal?: AbortSignal) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/posts", { signal, credentials: "include" });
      if (!res.ok) throw new Error(`GET /api/posts failed: ${res.status}`);

      const data: Post[] = await res.json();
      setPosts(data);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      if (signal?.aborted) return;
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {

    async function checkAuth() {
      const res = await fetch("/api/admin/", { credentials: "include" });
      const data = await res.json();
      if (!data.is_admin) navigate("/adminlogin");
    }
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "tomato" }}>{error}</div>;
  }

  return (
    <>
      <h1>ADMIN</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", border: "solid" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Title</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Content</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Date</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} style={{ borderTop: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>{p.id}</td>
              <td style={{ padding: "8px" }}>{p.title}</td>
              <td style={{ padding: "8px", maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.content}
              </td>
              <td style={{ padding: "8px" }}>
                {new Date(p.date_created).toLocaleString()}
              </td>
              <td style={{ padding: "8px" }}>
                <button onClick={() => deletePost(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
