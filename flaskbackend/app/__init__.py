from flask import Flask
from app.routes import linguistify_bp
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)


    # Import and register Blueprints
    
    app.register_blueprint(linguistify_bp)

    return app
