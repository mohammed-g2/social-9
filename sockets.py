from flask_login import current_user
from flask_socketio import emit
from app import socketio, db
from models import Message, User
from forms import MessageForm


@socketio.on('message-sent')
def message_sent(msg):
    if current_user.is_authenticated:
        user = current_user._get_current_object()
        message = Message(user=user, body=msg['data'])
        db.session.add(message)
        db.session.commit()
        emit('response', {'data': f'{current_user.username}: {msg["data"]}'})


@socketio.on('connect')
def connect():
    emit('user-connected', {'data': f'{current_user.username} connected'}, broadcast=True)


@socketio.on('disconnect')
def disconnected():
    print('client disconnected')

