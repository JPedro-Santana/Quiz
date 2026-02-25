from cs50 import SQL
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)

db = SQL("sqlite:///quiz.db")

CATEGORIES = [
    "Science",
    "Programming",
    "History",
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        title = request.form.get("title")
        category = request.form.get("category")
        description = request.form.get("description")
        
        if not title or not category:
            return "Title and Category are required."
        db.execute("INSERT INTO quiz (title, category, description) VALUES(?, ?, ?)", title, category, description)
        
        quiz_id = db.execute("SELECT last_insert_rowid() as id")[0]["id"]
        
        return redirect(url_for("quiz_layout", id=quiz_id))
    
    return render_template("create.html", categories=CATEGORIES)

@app.route("/explore", methods=["GET"])
def explore():
    category = request.args.get("category")
    order = request.args.get("order")
    search = request.args.get("q")
    
    query = "SELECT * FROM quiz WHERE 1=1"
    params= []
    
    if category and category != "all":
        query += " AND category = ?"
        params.append(category)

    if search:
        query += " AND title LIKE ?"
        params.append(f"%{search}%")

    if order == "recent":
        query += " ORDER BY id DESC"
    else:
        query += " ORDER BY id ASC"

    quizzes = db.execute(query, *params)

    return render_template("explore.html",
        quizzes=quizzes,
        categories=CATEGORIES,
        selected_category=category,
        selected_order=order,
        search_query=search
    )

@app.route("/quiz/<int:id>")
def quiz_layout(id):   
    quiz = db.execute("SELECT * FROM quiz WHERE id = ?", id) 
    
    if len(quiz) == 0:
        return "Quiz not Found"
    
    return render_template("quiz_layout.html", quiz=quiz[0])

if __name__ == "__main__":
    app.run(debug=True)