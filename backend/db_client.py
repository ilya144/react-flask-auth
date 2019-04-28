import sqlite3

class Database:
	def connect_db(self):
		self.conn = sqlite3.connect(self.db_name)
		cur = self.conn.cursor()
		return cur

	def close_db(self):
		self.conn.close()

	def commit_db(self):
		self.conn.commit()

	def __init__(self, db_name):
		self.conn = None
		self.db_name = db_name
		cur = self.connect_db()
		try:
			cur.execute("create table users (name text unique, mail text unique, password text)")
		except:
			pass
		self.close_db()

	def insert_user(self, name, mail, password):
		cur = self.connect_db()
		try:
			cur.execute(f"insert into users values('{name}', '{mail}', '{password}')")
		except Exception as e:
			return str(e)
		self.commit_db()
		self.close_db()

	def fetch_user_by_name(self, name):
		cur = self.connect_db()
		try:
			user = cur.execute(f"select * from users where name='{name}'").fetchone()
		except Exception as e:
			return str(e)
		self.commit_db()
		self.close_db()
		return user

	def fetch_user_by_mail(self, mail):
		cur = self.connect_db()
		try:
			user = cur.execute(f"select * from users where mail='{mail}'").fetchone()
		except Exception as e:
			return str(e)
		self.commit_db()
		self.close_db()
		return user