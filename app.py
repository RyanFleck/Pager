"""
Copyright (c) 2023 Ryan Fleck
License provided in LICENSE.txt
"""

from flask import Flask, render_template, send_from_directory
from os.path import join

app = Flask(__name__)

PUBLIC_KEY = r"BK4DEaQZAKU4SRxUIEVfWC77AvuNRB7i-XKhCwzyrBn4zTbbSe_bUG0UFnmmDLWdFggh_YlMeBVL80QZJ7G-KyY"
PRIVATE_KEY = r"FljBkMvJGe65Z7wlLN-htYEu59JrpUE2q8qHoU-_fFs"


# Serve the index template when requested
@app.route("/")
def index():
    return render_template("index.html", key=PUBLIC_KEY)


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        join(app.root_path, "static"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )


@app.route("/service-worker.js")
def service_worker():
    return send_from_directory(
        join(app.root_path, "static"),
        "service-worker.js",
        mimetype="text/javascript",
    )


# Run the backend, serve the favicon as a static file at the url root
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
