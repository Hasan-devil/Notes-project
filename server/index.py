from flask import Flask,jsonify,json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#Configurations
app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)

filename=r'D:\Documents\NotesApp\server\data.json'
with open(filename,'r') as file:
    data = json.load(file)

@app.route("/todos",methods=['GET'])
def hello():
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
