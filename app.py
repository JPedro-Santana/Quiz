from cs50 import SQL
from flask import Flask, render_template, request

app = Flask(__name__)


db = SQL("sqlite:///quiz.db")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/create")
def create():
    return render_template("create.html")

@app.route("/explore")
def explore():
    return render_template("explore.html")

if __name__ == "__main__":
    app.run(debug=True)