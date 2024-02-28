"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#-------------------------------------------------------------------------create user--------------------------------------------------------------------------------

@api.route("/token", methods=["POST"])

def create_token():

    email = request.json.get("email", None)

    password = request.json.get("password", None)


    # Consulta la base de datos por el nombre de usuario y la contraseña

    user = User.query.filter_by(email=email, password=password).first()


    if user is None:

        # el usuario no se encontró en la base de datos

        return jsonify({"msg": "Bad email or password"}), 401

    

    # Crea un nuevo token con el id de usuario dentro

    access_token = create_access_token(identity=user.id)

    return jsonify({ "token": access_token, "user_id": user.id }) 
