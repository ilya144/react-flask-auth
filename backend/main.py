from flask import Flask
from flask_jwt import JWT, jwt_required, current_identity

app = Flask(__name__)

@app.route('/login')
def login():
    pass

@app.route('/register')
def register():
    pass


