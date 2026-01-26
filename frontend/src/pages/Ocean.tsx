import { useEffect, useState } from "react";

type Post = {
  id: number;
  content: string;
  date_created: string;
};

export default function Ocean() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error(`GET /api/posts failed: ${res.status}`);

        const data: Post[] = await res.json();
        setPosts(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "tomato" }}>{error}</p>;

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id}>
          <p>{p.content}</p>
          <small>{new Date(p.date_created).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
