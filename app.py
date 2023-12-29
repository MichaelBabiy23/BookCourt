import os
import datetime

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from flask_login import login_required

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
        return render_template("index.html", username=username, active="true")
    return render_template("index.html", active="true")


@app.route("/login", methods=["GET", "POST"])
def login():
    """login user"""
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", username
        )
        if len(rows) != 1:
            return render_template("login.html" , fail="username", active="true")
        if not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return render_template("login.html" , fail="password", active="true")
        session["user_id"] = rows[0]["id"]
        session["logged_in"] = True
        return redirect("/")
    else:
        return render_template("login.html" , active="true")


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
        elif duplicate[0]["username"] == info["username"]:
            return render_template("register.html", fail="Username", active="true")
        elif duplicate[0]["email"] == info["email"]:
            return render_template("register.html", fail="Email", active="true")
        return render_template("register.html", fail="Phone", active="true")
    else:
        return render_template("register.html", active="true")
    
@app.route("/contact", methods=["GET", "POST"])
def contact():
    if session.get('logged_in') == True:
        return render_template("contact.html", username = db.execute("SELECT username FROM users WHERE id = ?", session["user_id"])[0]["username"], active="true")
    return render_template("contact.html", active="true")

@app.route("/history")
def history():
    if session.get('logged_in'):
        user = session["user_id"]
        curr_date = datetime.datetime.now().strftime("%Y-%m-%d")
        curr_hour = datetime.datetime.now().hour
        passed = db.execute("SELECT rent_time, start_time, date, order_date, court_id FROM rents WHERE user_id = ? AND date < ? AND start_time < ? ORDER BY date DESC, start_time",
                            user,
                            curr_date,
                            curr_hour
                            )
        passed[0]["counter"] = 0
        for pas in passed:
            pas["court_id"] = db.execute("SELECT court_name FROM courts WHERE id = ?", pas["court_id"])
            passed["counter"] += 1
        actives = db.execute("SELECT rent_time, start_time, date, order_date, court_id FROM rents WHERE user_id = ? AND date >= ? AND start_time >= ? ORDER BY date DESC, start_time",
                            user,
                            curr_date,
                            curr_hour
                            )
        actives[0]["counter"] = 0
        for act in actives:
            act["court_id"] = db.execute("SELECT court_name FROM courts WHERE id = ?", act["court_id"])[0]["court_name"]
            actives["counter"] += 1
        print(passed)
        print(actives)
        return render_template("history.html", 
                            username=db.execute("SELECT username FROM users WHERE id = ?", user)[0]["username"],
                            active="true",
                            passed=passed,
                            actives=actives
                            )
    return redirect("/login")

@app.route("/courts", methods=["GET", "POST"])
def courts():
    if session.get('logged_in'):
        if request.method == "POST":
            user_id = session["user_id"]

            if request.form['book'] == 'check':
                court_name = request.form.get("court_name")
                court_id = db.execute("SELECT id FROM courts WHERE court_name = ?", 
                        court_name
                        )
                hours = db.execute("SELECT hour FROM rents WHERE court_id = ? AND date = ?",
                                   court_id,
                                   #date
                                   )

            else:
                date = request.form.get("date-input")
                court_name = request.form.get("court_name")
                court_hours = db.execute("SELECT start_hour, end_hour FROM courts WHERE court_name = ?",
                    court_name
                    )
                selected_hour = request.form['hours']
                rent_hour = request.form['rent_hour']
                order_date = datetime.datetime.now().isoformat(sep=" ", timespec="seconds")
                court_id = db.execute("SELECT id FROM courts WHERE court_name = ?", 
                                      court_name
                                      )[0]["id"]
                db.execute("INSERT INTO rents (rent_time, start_time, date, order_date, court_id, user_id) VALUES (?, ?, ?, ?, ?, ?)",
                           rent_hour,
                           selected_hour,
                           date,
                           order_date,
                           court_id,
                           user_id
                           )
                return redirect("history")
        else:
            courts = db.execute("SELECT * FROM courts ORDER BY sport")
            sports = db.execute("SELECT sport FROM courts GROUP BY sport ORDER BY sport")
            return render_template("courts.html",
                                    username = db.execute("SELECT username FROM users WHERE id = ?", session["user_id"])[0]["username"],
                                    sports= sports,
                                    courts=courts,
                                    active="true",
                                    )
    return redirect("/login")