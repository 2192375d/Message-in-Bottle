from datetime import datetime, timezone
from flask import Blueprint, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

MAX_POST_TITLE_LENGTH = 48
MAX_POST_LENGTH = 1024

posts_bp = Blueprint("posts", __name__, url_prefix="/api/posts")


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


@posts_bp.route("", methods=["GET"])
def get_all_posts() -> Response:
    posts: list[Post] = Post.query.order_by(Post.date_created.desc()).all()
    return jsonify([p.to_dict() for p in posts])


@posts_bp.route("", methods=["POST"])
def add_post() -> tuple[Response, int]:
    data: dict = request.get_json(silent=True) or {}
    title: str = (data.get("title") or "").strip()
    content: str = (data.get("content") or "").strip()

    if not title:
        return jsonify({"error": "title is required"}), 400
    if len(title) > MAX_POST_TITLE_LENGTH:
        return jsonify({"error": f"title too long (max {MAX_POST_TITLE_LENGTH})"}), 400
    if not content:
        return jsonify({"error": "content is required"}), 400
    if len(content) > MAX_POST_LENGTH:
        return jsonify({"error": f"content too long (max {MAX_POST_LENGTH})"}), 400

    post: Post = Post()
    post.content = content
    post.title = title
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

@posts_bp.route("/<int:id>", methods=["DELETE"])
def delete_post(id: int):
    post: Post | None = db.session.get(Post, id)
    if not post:
        return jsonify({"error": "post not found"}), 404

    db.session.delete(post)
    db.session.commit()

    return jsonify({"ok": True}), 200
