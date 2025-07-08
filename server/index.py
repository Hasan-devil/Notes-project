from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#Configurations
app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)

class Todos(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(),nullable=False)
    def __repr__(self):
        return f"<Todos {self.id}: {self.value}>"
#API for todos
#Read
@app.route("/todos",methods=['GET'])
def todo_get():
    data = Todos.query.all()
    print(data)
    jsondata = []
    for value in data:
        jsondata.append({
            "id":value.id,
            "value":value.value
        })
    return jsonify(jsondata)
#Create
@app.route("/todos",methods=['POST'])
def todo_add():
    task = request.data.decode('utf-8')
    todoadd = Todos(value=task)
    print(todoadd)
    db.session.add(todoadd)
    db.session.commit()
    return jsonify({
    "id": todoadd.id,
    "value": todoadd.value
})
#Delete
@app.route("/todos/<int:id>",methods=['DELETE'])
def todo_del(id):
    delete = Todos.query.get(id)
    if delete:
        db.session.delete(delete)
        db.session.commit()
    else:
        print("there is an error while deleting")
    return "success"
#Update
@app.route("/todos/<int:id>",methods=['PUT'])
def todo_update(id):
    update = Todos.query.get(id)
    if not update:
        return jsonify({"Record not found"}),404
    data = request.data.decode('utf-8')
    if not data:
        return jsonify({"Record Cannot be empty"}),400
    update.value = data
    db.session.commit()
    return jsonify({
        "id": update.id,
        "value": update.value
    })


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
