from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#Configurations
app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)

                                #todo
class Todos(db.Model):                                                                           
    __tablename__ = 'todos'                                         #TODOS  
    id = db.Column(db.Integer, primary_key=True)                    #TODOS  
    value = db.Column(db.String(),nullable=False)                   #TODOS  
    def __repr__(self):                                             #TODOS  
        return f"<Todos {self.id}: {self.value}>"                   #TODOS  
    #API for todos                                                  #TODOS  
#Read                                                               #TODOS  
@app.route("/todos",methods=['GET'])                                #TODOS  
def todo_get():                                                     #TODOS  
    data = Todos.query.all()                                        #TODOS  
    print(data)                                                     #TODOS  
    jsondata = []                                                   #TODOS  
    for value in data:                                              #TODOS  
        jsondata.append({                                           #TODOS  
            "id":value.id,                                          #TODOS  
            "value":value.value                                     #TODOS  
        })                                                          #TODOS  
    return jsonify(jsondata)                                        #TODOS  
#Create                                                             #TODOS  
@app.route("/todos",methods=['POST'])                               #TODOS  
def todo_add():                                                     #TODOS  
    task = request.data.decode('utf-8')                             #TODOS  
    todoadd = Todos(value=task)                                     #TODOS  
    print(todoadd)                                                  #TODOS  
    db.session.add(todoadd)                                         #TODOS  
    db.session.commit()                                             #TODOS  
    return jsonify({                                                #TODOS  
    "id": todoadd.id,                                               #TODOS  
    "value": todoadd.value                                          #TODOS  
})                                                                  #TODOS  
#Delete                                                             #TODOS  
@app.route("/todos/<int:id>",methods=['DELETE'])                    #TODOS  
def todo_del(id):                                                   #TODOS  
    delete = Todos.query.get(id)                                    #TODOS  
    if delete:                                                      #TODOS  
        db.session.delete(delete)                                   #TODOS  
        db.session.commit()                                         #TODOS  
    else:                                                           #TODOS  
        print("there is an error while deleting")                   #TODOS  
    return "success"                                                #TODOS  
#Update                                                             #TODOS  
@app.route("/todos/<int:id>",methods=['PUT'])                       #TODOS  
def todo_update(id):                                                #TODOS  
    update = Todos.query.get(id)                                    #TODOS  
    if not update:                                                  #TODOS  
        return jsonify({"Record not found"}),404                    #TODOS  
    data = request.data.decode('utf-8')                             #TODOS  
    if not data:                                                    #TODOS  
        return jsonify({"Record Cannot be empty"}),400              #TODOS  
    update.value = data                                             #TODOS  
    db.session.commit()                                             #TODOS  
    return jsonify({                                                #TODOS  
        "id": update.id,                                            #TODOS  
        "value": update.value                                       #TODOS  
    })                                                      
'''____________________________________Notes_________________________________________'''
                                       
class Notes(db.Model):                                                  #Notes 
    __tablename__ = 'notes'                                             #Notes
    id = db.Column(db.Integer,primary_key=True)                         #Notes
    title = db.Column(db.String(),nullable=True)                        #Notes
    description = db.Column(db.String(),nullable=False)                 #Notes 
     #API                                                               #Notes 
#Read                                                                   #Notes 
@app.route('/notes',methods=['GET'])                                    #Notes 
def note_get():                                                         #Notes 
    notes_data = Notes.query.all()                                      #Notes 
    jsondata=[]                                                         #Notes 
    for value in notes_data:                                            #Notes
        jsondata.append({                                               #Notes
            "id":value.id,                                              #Notes
            "title":value.title,                                        #Notes 
            "description":value.description                             #Notes 
        })                                                              #Notes 
    return jsonify(jsondata)                                            #Notes
#Add                                                                    #Notes 
@app.route('/notes',methods=['POST'])                                   #Notes 
def note_add():                                                         #Notes 
    data = request.json                                                 #Notes
    description = data.get('description')                               #Notes 
    title =data.get('title')                                            #Notes
    notesadd = Notes(title=title,description=description)               #Notes 
    db.session.add(notesadd)                                            #Notes
    db.session.commit()                                                 #Notes
    return jsonify({                                                    #Notes
        "id":notesadd.id,                                               #Notes
        "title":notesadd.title,                                         #Notes 
        "description":notesadd.description                              #Notes 
    })                                                                  #Notes 
#Delete                                                                 #Notes 
@app.route('/notes/<int:id>',methods=['DELETE'])                        #Notes 
def note_del(id):                                                       #Notes 
    noteDel = Notes.query.get(id)                                       #Notes 
    if noteDel:                                                         #Notes 
        db.session.delete(noteDel)                                      #Notes 
        db.session.commit()                                             #Notes 
    else:                                                               #Notes 
        print("failed")                                                 #Notes 
        return "There is an error While Deleting the Note"              #Notes         
    print("success")                                                    #Notes 
    return "Deleted Successfully"                                       #Notes 
#Update                                                                 #Notes 
@app.route('/notes/<int:id>',methods=['PUT'])                           #Notes 
def note_upd(id):                                                       #Notes 
    noteUpd = Notes.query.get(id)                                       #Notes 
    data = request.json                                                 #Notes 
    title = data.get('title')                                           #Notes 
    description = data.get('description')                               #Notes 
    noteUpd.title = title                                               #Notes 
    noteUpd.description = description                                   #Notes 
    db.session.commit()                                                 #Notes 
    return jsonify({                                                    #Notes 
        "id":id,                                                        #Notes 
        "title":noteUpd.title,                                          #Notes 
        "description":noteUpd.description                               #Notes 
    })                                                                  #Notes 



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
