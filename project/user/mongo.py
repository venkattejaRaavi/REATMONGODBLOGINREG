from flask import Flask,jsonify,request,json,render_template,redirect,url_for
from flask_pymongo import PyMongo
from bson import ObjectId
from datetime import datetime
from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_mail import Mail,Message
import jwt
import random



key = 'secret'


app=Flask(__name__)
app.config['MONGO_DBNAME'] = 'reactloginreg'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/reactloginreg'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MAIL_USERNAME']='noreply.witon@gmail.com'
app.config['MAIL_PASSWORD']='@NoreplyWiton123'
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

import nexmo

client = nexmo.Client(key='57555592', secret='33iWMxWeADDV4050')


mongo = PyMongo(app)
bcrypt = Bcrypt(app)
CORS(app)
mail=Mail(app)


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
    existing_user=users.find_one({'email':email})
    if existing_user:
        result=jsonify({'status_code':409,'message':"Email already exists please login"})
    else:
        
        user_id = users.insert({
        'first_name': first_name,
        'last_name' : last_name,
        'email':email,
        'address':address,
        'password': password,
        'created': created,
        'confirmed':False,
        })
   
        new_user=users.find_one({'_id': user_id})
        registration_token = jwt.encode({'_id':str(new_user['_id'])},key,algorithm='HS256').decode('utf-8')
        
        result= jsonify({'status_code':200,'registration_token':registration_token})
    
    return result


@app.route('/users/emailverification',methods=['GET'])
def checkEmail():
    users=mongo.db.users
    registration_token=request.headers.get('Authorization')
    split_registration_token=registration_token.split()[1]
    token=split_registration_token
    decoded = jwt.decode(token, key, algorithms='HS256')
    user_id=ObjectId(decoded['_id'])
    response = users.find_one({'_id': ObjectId(user_id)})

    verification_token=jwt.encode({'_id':str(response['_id']),'exp': datetime.utcnow() + timedelta(seconds=120)},key,algorithm='HS256').decode('utf-8')

    confirm_url=url_for('confirm_email',token=verification_token,_external=True)
    template=render_template('user/activate.html',confirm_url=confirm_url)
    subject="Please confirm your mail"
    msg=Message(subject,recipients=[response['email']],html=template,sender='noreply.witon@gmail.com')
    mail.send(msg)
    return jsonify({'status_code':200,'message':'A confimation mail has been sent to your email'})
    
@app.route('/users/confirm/<token>')
def confirm_email(token):
    users=mongo.db.users
    try:
        decoded = jwt.decode(token, key, algorithms='HS256')
        user_id=ObjectId(decoded['_id'])
        new_user=users.find_one({'_id':ObjectId(user_id)})
        
        if new_user['confirmed']:
            result=jsonify({'status_code':409,'message':'Already registered please login'})
        else:
            users.find_one_and_update(
                {
                    '_id': ObjectId(new_user['_id'])
                },
                {
                    '$set':{
                                'confirmed':True
                            }
                },
                projection={'seq':True,'_id':False},
                upsert=True,
            )
            
            result= render_template('user/verificationsuccess.html')
    except jwt.ExpiredSignatureError:
        result= render_template('user/sessionexpiredpage.html')
    return result

@app.route('/users/phoneverification/',methods=['POST'])
def sendOTP():
    
    reqData = request.get_json()
    
    users=mongo.db.users
    user_phone=reqData['phone']

    token=request.headers.get('Authorization')
    split_token=token.split()[1]
    decoded = jwt.decode(split_token, key, algorithms='HS256')

    user_id=ObjectId(decoded['_id'])
    response = users.find_one({'_id': user_id})

    verification_code = str(random.randrange(100000, 999999))

    try:
        client.send_message({
        'from': 'Nexmo',
        'to': user_phone,
        'text': verification_code,
        })
        users.find_one_and_update(
            {
                '_id': ObjectId(user_id)
            },
            {
                '$set':{
                            'otp':verification_code,
                        }
            },
            projection={'seq':True,'_id':False},
            upsert=True,
        )

        sms_token=jwt.encode({'_id':str(response['_id']),'exp': datetime.utcnow() + timedelta(seconds=120)},key,algorithm='HS256').decode('utf-8')

        result=jsonify({'sms_token':sms_token,'message': "An otp has been sent to your phone",'status_code':200})
    except:
        result=jsonify({'message': "Unable to send the otp please Enter a valid mobile number",'status_code':422})


    return result



@app.route('/users/otpverification/',methods=['POST'])
def verifyOTP():
    reqData = request.get_json()
    
    users=mongo.db.users
    user_otp=reqData['otp']

    token=request.headers.get('Authorization')
    split_token=token.split()[1]

    try:
        decoded = jwt.decode(split_token, key, algorithms='HS256')
        user_id=ObjectId(decoded['_id'])
        response = users.find_one({'_id': user_id})
        if response['otp']== str(user_otp):
            if response['confirmed']:
                result=jsonify({'status_code':409,'message':'Already registered please login'})
            else:
                users.find_one_and_update(
                    {
                        '_id': ObjectId(response['_id'])
                    },
                    {
                        '$set':{
                                'confirmed':True
                                }
                    },
                projection={'seq':True,'_id':False},
                upsert=True,
                )
                result=jsonify({'status_code':200,'message':'Registered successfully'})
        else:
             result=jsonify({'status_code':406,'message':'OTP is incorrect'})
        
        
    except jwt.ExpiredSignatureError:
        result= jsonify({'status_code':440,'message':'session timeout'})
    return result






@app.route('/users/login',methods=["POST"])
def login():
    users=mongo.db.users
    
    email= request.get_json()['email']
    password=request.get_json()['password']
    result= ""

    response = users.find_one({'email': email})
  
    
    if response:
        if response['confirmed']:
            if bcrypt.check_password_hash(response['password'],password):
            
                access_token = jwt.encode({'_id':str(response['_id']),'exp': datetime.utcnow() + timedelta(seconds=1200)},key,algorithm='HS256').decode('utf-8')
                result = jsonify({'token': str(access_token), 'status_code':200})
            
            
            else:
                result = jsonify({'message':'Invalid Username and Password','status_code':400})
        else:
            result= jsonify({'message':'You have not verified your account','status_code':401})
    else:
        result= jsonify({'message':'No results found','status_code':404})
    
    return result

@app.route('/users/profile',methods=["GET"])
def getProfile():
    users=mongo.db.users
    token=request.headers.get('Authorization')
    split_token=token.split()[1]
    #print("The token is :",split_token)
    try:
        decoded = jwt.decode(split_token, key, algorithms='HS256')
        user_id=ObjectId(decoded['_id'])
        response = users.find_one({'_id': ObjectId(user_id)})
        return jsonify({
        'first_name':response['first_name'],
        'last_name':response['last_name'],
        'address':response['address'],
        'email':response['email'],
        'status_code': 200
        })
    except jwt.ExpiredSignatureError:
        return jsonify({'status_code':440,'expiry_message':'Session has been expired please logout and login again'})
    except:
        return jsonify({
            'status_code':404
        })
   

@app.route('/users/update/',methods=["PATCH"])

def update():
    reqData = request.get_json()
    print(reqData)
    users=mongo.db.users
    new_first_name=reqData['new_first_name']
    new_last_name=reqData['new_last_name']
    new_email=reqData['new_email']
    new_address=reqData['new_address']
   

    token=request.headers.get('Authorization')
    split_token=token.split()[1]
    try:
        decoded = jwt.decode(split_token, key, algorithms='HS256')
        user_id=ObjectId(decoded['_id'])
        
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
        return jsonify({'message': "Details have been updated",'status_code':200 })
    except jwt.ExpiredSignatureError:
        return jsonify({'status_code':440,'expiry_message':'Session has been expired please logout and login again'})
    except:
        return jsonify({
            'status_code':404
        }) 
     
@app.route('/users/deactivate/',methods=["DELETE"])
def deactivate():
    users=mongo.db.users
    token=request.headers.get('Authorization')
    split_token=token.split()[1]
    try:
        decoded = jwt.decode(split_token, key, algorithms='HS256')
        user_id=ObjectId(decoded['_id'])
        users.delete_one({'_id': ObjectId(user_id)})

        return jsonify({'message': "Hope! we will see you soon",'status_code':200 })

    except jwt.ExpiredSignatureError:
        return jsonify({'status_code':440,'expiry_message':'Session has been expired please logout and login again'})

    except:
        return jsonify({
            'status_code':404
        })






if __name__ == '__main__':

    app.run(debug=True)



#findOneAndUpdate



