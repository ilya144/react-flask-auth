from flask import Flask
from flask_jwt import JWT, jwt_required, current_identity
import sqlite3

app = Flask(__name__)
app.config['SECRET_KEY'] = 'notsosecret' # key for JWT signature

@app.route('/login', method=['POST'])
def login():
    pass

@app.route('/register', method=['POST'])
def register():
    pass

if __name__ == "__main__":
    pass
