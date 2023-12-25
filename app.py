import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///book.db")

def escape(s):
    """
    Escape special characters.

    https://github.com/jacebrowning/memegen#special-characters
    """
    for old, new in [
        ("-", "--"),
        (" ", "-"),
        ("_", "__"),
        ("?", "~q"),
        ("%", "~p"),
        ("#", "~h"),
        ("/", "~s"),
        ('"', "''"),
    ]:
        s = s.replace(old, new)
    return s


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    if session.get('logged_in'):
        username = db.execute("SELECT username FROM users WHERE id = ?", session["user_id"])[0]["username"]                
        return render_template("index.html", username=username)
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """login user"""
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", username
        )
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return render_template("login.html")
        session["user_id"] = rows[0]["id"]
        session["logged_in"] = True
        return redirect("/")
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""
    session.clear()
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        info = {
            'username' : request.form.get("username"),
            'password' : request.form.get("password"),
            'email' : request.form.get("mail"),
            'phone' : request.form.get("phone")
        }
        duplicate = db.execute(
            "SELECT username, email, phone FROM users WHERE username = ? or email = ? or phone = ? ", 
            info["username"],
            info["email"],
            info["phone"]
        )
        if not duplicate:
            hash = generate_password_hash(info["password"], method="pbkdf2", salt_length=16)
            db.execute(
                "INSERT INTO users (username, hash, email, phone) VALUES(?, ?, ?, ?)",
                escape(info["username"]),
                hash,
                escape(info["email"]),
                info["phone"]
            )
            return redirect("/login")
        #TODO : ELSE ALERT!! 
    else:
        return render_template("register.html")
    
@app.route("/contact", methods=["GET", "POST"])
def contact():
    if session.get('logged_in') == True:
        return render_template("contact.html", username = db.execute("SELECT username FROM users WHERE id = ?", session["user_id"])[0]["username"])
    return render_template("contact.html")