import { useState } from "react";
import type { Post } from "../types/types.tsx"

function HandleSubmission() {
  //insert code here
}

export default function PostMaker() {

  const [title, setTitle] = useState("title");
  const [content, setContent] = useState("content");

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
        style={{}}
      >

        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          style={{
            width: "100%",
            height: "300px",
            resize: "none",      // optional: prevent manual resizing
            padding: "10px",
            marginTop: "20px",
            boxSizing: "border-box",
            borderRadius: "3px",
          }}
        />
        <button
          type="submit"
          onClick={HandleSubmission}
          style={{
            marginTop: "20px"
          }}>
          POST
        </button>
      </form>
    </div>
  )
}
