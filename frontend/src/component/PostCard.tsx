type Props = {
  title: string
  content: string
  date_created: string
}

export default function PostCard({ title, content, date_created }: Props) {
  return (
    <div style={{
      background: "linear-gradient(145deg, #0b1b3a 0%, #0e2a57 60%, #12386f 100%)",
      color: "#e8f1ff",
      padding: "14px 16px",
      width: "250px",
      borderRadius: "14px",
      // boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      border: "1px solid rgba(255,255,255,0.08)",
      // textAlign: "left",
      // display: "flex",
      // flexDirection: "column",
      // gap: "8px",
    }}>
      <h1>{title}</h1>
      <p>{content}</p>
      <small>{new Date(date_created).toLocaleString()}</small>
    </div >
  )
}
