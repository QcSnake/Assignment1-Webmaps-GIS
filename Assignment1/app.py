from flask import Flask, render_template, send_from_directory
import os

app = Flask(
    __name__,
    static_folder='static',      # default: 'static'
    template_folder='templates'  # default: 'templates'
)

@app.route('/')
def index():
    # Renders templates/index.html
    return render_template('index.html')

# (Optional) If you ever need to serve data from /data via a custom path:
@app.route('/data/<path:filename>')
def data_files(filename):
    return send_from_directory(os.path.join(app.static_folder, 'data'), filename)

if __name__ == '__main__':
    app.run(debug=True)
