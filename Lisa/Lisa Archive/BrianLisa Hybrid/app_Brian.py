from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/charts-trends")
def chartstrends():
    """Return the homepage."""
    return render_template("index_charts_trends.html")

@app.route("/charts-life")
def chartslife():
    """Return the homepage."""
    return render_template("index_charts_life.html")

@app.route("/charts-infant")
def chartsinfant():
    """Return the homepage."""
    return render_template("index_charts_infant.html")

if __name__ == "__main__":
    app.run()