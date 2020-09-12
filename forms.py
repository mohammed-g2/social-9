from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError
from models import User


class LoginForm(FlaskForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    username = StringField('username', validators=[DataRequired(), Length(min=3, max=32)])
    password = PasswordField('password', validators=[DataRequired(), Length(min=6)])
    remember_me = BooleanField('remember me')


class RegisterForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=3, max=32)])
    password = PasswordField('password', validators=[DataRequired(), Length(min=6)])

    def validate_username(self, field):
        user = User.query.filter_by(username=field.data).first()
        if user is not None:
            raise ValidationError('username already used') 


class MessageForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
