from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(256), nullable=False)
    date_created = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self) -> str:
        return f"<Post id={self.id}>"


@app.route('/')
def home() -> str:
    return "this is home"

@app.route('/about')
def about() -> str:
    return "this is about"

if __name__ == '__main__':
    app.run(debug=True)

