from flask import Flask, request, make_response
from db_client import Database
import json
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'notsosecret' # key for JWT signature

def ajax_response(payload=None): # response with headers, allows CORS
	if payload == None:
		resp = make_response()
	else:
		resp = make_response(payload)
	resp.headers["Access-Control-Allow-Origin"] = "*"
	resp.headers["Access-Control-Allow-Methods"] = "GET, PUT, PATCH, POST, DELETE"
	resp.headers["Access-Control-Allow-Headers"] = "access-control-allow-credentials,\
access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,\
content-type,x-content-type-options"
	return resp

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
	if request.method == "OPTIONS":
		return ajax_response()
	else:
		form_data = json.loads(request.data)
		user = db.fetch_user_by_name(form_data["name"])# (name, mail, password) in db
		if user == None:
			payload = {"response" : "user not found"}
		elif user[2]!=form_data["password"]:
			payload = {"response" : "wrong password"}
		elif user == (form_data["name"], user[1], form_data["password"]):
			token_payload = dict()
			d = token_payload
			d["name"], d["mail"], d["password"] = user
			token_payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
			token = jwt.encode(token_payload,app.config['SECRET_KEY']).decode()
			payload = {"response" : "jwt", "body" : token}
		return ajax_response(json.dumps(payload))


@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
	if request.method == "OPTIONS":
		return ajax_response()
	else:
		form_data = json.loads(request.data)
		user = tuple(form_data.values())
		if db.fetch_user_by_name(form_data["name"]) != None:
			payload = {"response" : "this name is already exist"}
		elif db.fetch_user_by_mail(form_data["mail"]) != None:
			payload = {"response" : "this mail is already exist"}
		else:
			db.insert_user(*user)
			payload = {"response" : "user successfully signed up"}
		return ajax_response(json.dumps(payload))


if __name__ == "__main__":
	db = Database("Users.db")
	app.run()
