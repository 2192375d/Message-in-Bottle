from flask import Flask, jsonify, Response, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
db = SQLAlchemy(app)

MAX_POST_TITLE_LENGTH = 48
MAX_POST_LENGTH = 1024

CORS(app, resources={r"/api/*": {"origins": "*"}})

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(MAX_POST_TITLE_LENGTH), nullable=False)
    content = db.Column(db.String(MAX_POST_LENGTH), nullable=False)
    date_created = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


    def __repr__(self) -> str:
        return f"<Post id={self.id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "date_created": self.date_created.isoformat(),
        }


@app.route("/api/posts", methods=["GET"])
def get_all_posts() -> Response:
    posts: list[Post] = Post.query.order_by(Post.date_created.desc()).all()
    return jsonify([p.to_dict() for p in posts])

@app.route("/api/posts", methods=["POST"])
def add_post() -> tuple[Response, int]:
    data: dict = request.get_json(silent=True) or {}
    title: str = (data.get("title") or "").strip()
    content: str = (data.get("content") or "").strip()

    if not title:
        return jsonify({"error": f"title is required"}), 400
    if len(title) > MAX_POST_TITLE_LENGTH:
        return jsonify({"error": f"content too long (max {MAX_POST_TITLE_LENGTH})"}), 400
    if not content:
        return jsonify({"error": f"content is required"}), 400
    if len(content) > MAX_POST_LENGTH:
        return jsonify({"error": f"content too long (max {MAX_POST_LENGTH})"}), 400

    post: Post = Post()
    post.content = content
    post.title = title
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)


