from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
    # test only for now, add more functionality to this
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}
