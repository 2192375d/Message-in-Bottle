import { useState } from "react";

type Props = {
  onPosted: () => void
}

export default function PostMaker({ onPosted }: Props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function HandleSubmission(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `POST /api/posts failed: ${res.status}`);
    }

    setTitle("")
    setContent("")
    onPosted()
  }

  return (
    <div style={{
      padding: "20px",
      margin: "20px",
      background: "#0b1b3a",
      color: "#e8f1ff",
      width: "250px",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",

    }}>

      <h1>Create a Post</h1>
      <form
        onSubmit={HandleSubmission}
      >

        <input type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          style={{
            width: "100%",
            height: "300px",
            resize: "none",
            padding: "10px",
            marginTop: "20px",
            boxSizing: "border-box",
            borderRadius: "3px",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "20px"
          }}>
          POST
        </button>
      </form>
    </div>
  )
}
