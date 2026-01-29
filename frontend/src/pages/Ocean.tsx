import { useEffect, useState } from "react";
import PostCard from "../component/PostCard";
import PostMaker from "../component/PostMaker.tsx"
import type { Post } from "../types/types.tsx"

export default function Ocean() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(signal?: AbortSignal) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/posts", { signal });
      if (!res.ok) {
        throw new Error(`GET /api/posts failed: ${res.status}`);
      }

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "tomato" }}>{error}</div>;
  }

  return (
    <div style={{
      display: "flex"
    }}>

      <PostMaker onPosted={load} />

      <div style={{
        display: "flex",
        gap: "20px"
      }}>
        {posts.map((p) => (
          <div key={p.id}>
            <PostCard title={p.title} content={p.content} date_created={p.date_created} />
          </div>
        ))}
      </div>

    </div>
  );
}
