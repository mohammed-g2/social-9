from flask import render_template, redirect, abort, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user
from app import app, db
from forms import LoginForm, RegisterForm, MessageForm
from models import User, Message


@app.route('/')
def index():
    form = MessageForm()
    messages = Message.query.order_by(Message.created_at.desc())
    return render_template('index.html', form=form, messages=messages)


@app.route('/auth')
def auth():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    login_form = LoginForm()
    register_form = RegisterForm()
    return render_template('auth.html', login_form=login_form, register_form=login_form)


@app.route('/login', methods=['POST'])
def login():
    if not current_user.is_authenticated:
        form = LoginForm()
        if form.validate():
            user = User.query.filter_by(username=form.username.data).first()
            if user is not None and user.check_password(form.password.data):
                login_user(user, remember=form.remember_me.data)
                return redirect(url_for('auth'))
        return jsonify({'error': 'invalid username or password'}), 400


@app.route('/register', methods=['POST'])
def register():
    if not current_user.is_authenticated:
        form = RegisterForm()
        if form.validate():
            user = User(username=form.username.data, password=form.password.data)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for('index'))
        return jsonify(form.errors), 400


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
