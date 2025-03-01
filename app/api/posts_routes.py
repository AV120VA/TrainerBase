from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Post

post_routes = Blueprint('posts', __name__)

# Get all posts
@post_routes.route('/', methods=["GET"])
def posts():
    # test only for now, add more functionality to this
    posts = Post.query.all()
    return jsonify({"Posts": [post.to_dict() for post in posts]})

# Get all of a user's posts
@post_routes.route('/current', methods=["GET"])
@login_required
def userPosts():
    posts = Post.query.filter(Post.user_id == current_user.id)
    return jsonify({"Posts": [post.to_dict() for post in posts]})

