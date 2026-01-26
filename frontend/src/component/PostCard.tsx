type Props = {
  title: string
  content: string
}

export default function PostCard({ title, content }: Props) {
  return (
    <div style={{
      backgroundColor: "darkblue",
      padding: "0.1px 8px",
      width: "300px",
      textAlign: "center"
    }}>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}
