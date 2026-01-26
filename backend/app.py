from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'squlite:///test.db'
db = SQLAlchemy(app)

@app.route('/')
def home():
    return "this is home"

@app.route('/about')
def about():
    return "this is about"

if __name__ == '__main__':
    app.run(debug=True)
