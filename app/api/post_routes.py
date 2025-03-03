from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, PostImage
from app.models.db import db

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
def user_posts():
    posts = Post.query.filter(Post.user_id == current_user.id)
    return jsonify({"Posts": [post.to_dict() for post in posts]})

# Create a Post
@post_routes.route('/', methods=["POST"])
@login_required
def new_post():
    data = request.json

    if not data or not data.get('title'):
        return jsonify({"message": "Title is required"}), 400

    post_data = {
        "title": data['title'],
        'user_id': current_user.id,
    }

    if 'content' in data:
        post_data['content'] = data['content']

    post = Post(**post_data)
    db.session.add(post)
    db.session.commit()

    return jsonify(post.to_dict())

# Add an Image to a Post
@post_routes.route('/<int:post_id>/images', methods=["POST"])
@login_required
def add_image(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404

    if post.user_id != current_user.id:
        return jsonify({"message": "You can't add images to a post that isn't yours"}), 403

    data = request.json
    if not data or not data.get('url'):
        return jsonify({"message": "URL is required"}), 400

    image = PostImage(post_id=post_id, url=data['url'])
    db.session.add(image)
    db.session.commit()

    return jsonify(image.to_dict())

# Edit a Post
@post_routes.route('/<int:post_id>', methods=["PUT"])
@login_required
def update_post(post_id):
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({"message": "Post not found"}), 404

    if post.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json

    if not data:
        return jsonify({"message": "Invalid data"}), 400

    if 'title' in data:
        post.title = data['title']

    if 'content' in data:
        post.content = data['content']

    if 'likes' in data:
        post.likes = data['likes']

    db.session.commit()

    return jsonify(post.to_dict())

# Delete a Post
@post_routes.route('/<int:post_id>', methods=["DELETE"])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({"message": "Post not found"}), 404

    if post.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 401

    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Post deleted"})
