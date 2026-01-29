import os
from flask import Flask
from flask_cors import CORS

from auth import auth_bp
from posts import db, posts_bp

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-only-key")

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
db.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(posts_bp)

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
