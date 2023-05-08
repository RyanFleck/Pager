from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)


# Serve the index template when requested
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )


# Run the backend, serve the favicon as a static file at the url root
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
