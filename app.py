import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO
from config import config_options


config_obj = config_options[os.environ.get('APP_CONFIG')]
app = Flask(__name__)
app.config.from_object(config_obj)

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
socketio = SocketIO(app)


from views import *
from sockets import *


if __name__ == '__main__':
    socketio.run(app)
