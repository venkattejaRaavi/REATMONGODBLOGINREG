from flask import Flask,jsonify,request,json
from flask_pymongo import PyMongo
from bson import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token


app=Flask(__name__)
app.config['MONGO_DBNAME'] = 'reactloginreg'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/reactloginreg'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)


'''Writing backend code for Register page'''

@app.route('/users/register',methods=["POST"])
def register():
    users=mongo.db.users
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email= request.get_json()['email']
    address=request.get_json()['address']
    password= bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    user_id = users.insert({
        'first_name': first_name,
        'last_name' : last_name,
        'email':email,
        'address':address,
        'password': password,
        'created': created
    })

    new_user = users.find_one({'_id': user_id})
    

    result = {'email' : new_user['email'] + ' registered'}
    return jsonify({'result' : result})


'''Writing backend for login page'''

@app.route('/users/login',methods=["POST"])
def login():
    users=mongo.db.users
    email= request.get_json()['email']
    password=request.get_json()['password']
    result= ""

    response = users.find_one({'email': email})
    
    if response:
        if bcrypt.check_password_hash(response['password'],password):
            access_token = create_access_token(identity={ '_id':str(response['_id'])})
            result = jsonify({'token': access_token, 'status_code':200})
        else:
            result = jsonify({'error':'Invalid Username and Password','status_code':400})
    else:
        result= jsonify({'result':'No results found','status_code':404})
    
    return result

@app.route('/users/profile/<user_id>',methods=["GET"])
def getProfile(user_id):
    users=mongo.db.users
    #print(user_id)
    response = users.find_one({'_id': ObjectId(user_id)})
    #print(response)
    return jsonify({
        'first_name':response['first_name'],
        'last_name':response['last_name'],
        'address':response['address'],
        'email':response['email']
        
    })

@app.route('/users/update/<user_id>',methods=["PATCH"])
def update(user_id):
    users=mongo.db.users
    new_first_name=request.get_json()['new_first_name']
    new_last_name=request.get_json()['new_last_name']
    new_email=request.get_json()['new_email']
    new_address=request.get_json()['new_address']
    users.find_one_and_update(
        {
            '_id': ObjectId(user_id)
        },
        {
            '$set':{
                        'first_name':new_first_name,
                        'last_name':new_last_name,
                        'email':new_email,
                        'address':new_address
                    }
        },
        projection={'seq':True,'_id':False},
        upsert=True,
        )
    result="You have updated your details successfully"   
    return jsonify({'result': result})  
     
@app.route('/users/deactivate/<user_id>',methods=["DELETE"])
def deactivate(user_id):
    print(user_id)
    users=mongo.db.users
    users.delete_one({'_id': ObjectId(user_id)})
    result="Hope! we will expect you soon"
    return jsonify({
        
        'result':result
    })






if __name__ == '__main__':

    app.run(debug=True)



#findOneAndUpdate



