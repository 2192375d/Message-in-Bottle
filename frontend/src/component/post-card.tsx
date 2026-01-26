type Props = {
  title: string
  content: string
}

export default function PostCard({ title, content }: Props) {
  return (
    <div style={{ backgroundColor: "darkblue" }}>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}
