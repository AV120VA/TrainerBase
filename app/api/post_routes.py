from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, PostImage, User, SaveForLater
from app.models.db import db

post_routes = Blueprint('posts', __name__)

# Get all posts
@post_routes.route('/', methods=["GET"])
def posts():
    posts = Post.query.all()
    result = []

    for post in posts:
        user = User.query.get(post.user_id)
        post_image = PostImage.query.filter_by(post_id=post.id).first()
        image_url = post_image.image_url if post_image else None

        post_dict = post.to_dict()
        post_dict['User'] = {
            'username': user.username,
            'user_id': user.id,
        }
        if image_url is not None:
            post_dict['PostImage'] = image_url

        result.append(post_dict)

    return jsonify({"Posts": result})

# Get a single post
@post_routes.route('/<int:post_id>', methods=["GET"])
def single_post(post_id):
    post = Post.query.get(post_id)
    user = User.query.get(post.user_id)
    post_image = PostImage.query.filter_by(post_id=post.id).first()
    image_url = post_image.image_url if post_image else None

    post_dict = post.to_dict()
    post_dict['User'] = {
        'username': user.username,
        'user_id': user.id,
    }
    if image_url is not None:
        post_dict['PostImage'] = image_url

    return jsonify(post_dict)


# Get all of a user's posts
@post_routes.route('/current', methods=["GET"])
@login_required
def user_posts():
    posts = Post.query.filter(Post.user_id == current_user.id)
    result = []

    for post in posts:
        user = User.query.get(post.user_id)
        post_image = PostImage.query.filter_by(post_id=post.id).first()
        image_url = post_image.image_url if post_image else None

        post_dict = post.to_dict()
        post_dict['User'] = {
            'username': user.username,
            'user_id': user.id,
        }
        if image_url is not None:
            post_dict['PostImage'] = image_url

        result.append(post_dict)

    return jsonify({"Posts": result})

# Get all saved posts
@post_routes.route('/saved', methods=["GET"])
@login_required
def saved_posts():
    saved_posts = SaveForLater.query.filter(SaveForLater.user_id == current_user.id).all()
    result = []
    for saved_post in saved_posts:
        post = Post.query.get(saved_post.post_id)
        user = User.query.get(post.user_id)
        post_image = PostImage.query.filter_by(post_id=post.id).first()
        image_url = post_image.image_url if post_image else None

        post_dict = post.to_dict()
        post_dict['User'] = {
            'username': user.username,
            'user_id': user.id,
        }
        if image_url is not None:
            post_dict['PostImage'] = image_url

        result.append(post_dict)
    return jsonify({"Posts": result})

# Save a post for later
@post_routes.route('/<int:post_id>/save', methods=["POST"])
@login_required
def save_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"message": "Post not found"}), 404

    saved_post = SaveForLater.query.filter_by(user_id=current_user.id, post_id=post_id).first()

    if saved_post:
        return jsonify({"message": "Post already saved"}), 400

    new_save = SaveForLater(user_id=current_user.id, post_id=post_id)
    db.session.add(new_save)
    db.session.commit()

    return jsonify({"message": "Post saved successfully"})

# Unsave a post
@post_routes.route('/<int:post_id>/unsave', methods=["DELETE"])
@login_required
def unsave_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"message": "Post not found"}), 404

    saved_post = SaveForLater.query.filter_by(user_id=current_user.id, post_id=post_id).first()

    if not saved_post:
        return jsonify({"message": "Post not saved"}), 400

    db.session.delete(saved_post)
    db.session.commit()

    return jsonify({"message": "Post unsaved successfully"})



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

    image = PostImage(post_id=post_id, image_url=data['url'])
    db.session.add(image)
    db.session.commit()

    return jsonify(image.to_dict())

# Update an Image for a Post
@post_routes.route('/<int:post_id>/images', methods=["PUT"])
@login_required
def update_image(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404

    if post.user_id != current_user.id:
        return jsonify({"message": "You can't update images to a post that isn't yours"}), 403

    data = request.json
    if not data or not data.get('url'):
        return jsonify({"message": "URL is required"}), 400

    image = PostImage.query.filter_by(post_id=post_id).first()
    if not image:
        image = PostImage(post_id=post_id, image_url=data['url'])
        db.session.add(image)
    else:
        image.image_url = data['url']

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

# Delete an Image from a Post
@post_routes.route('/<int:post_id>/images', methods=["DELETE"])
@login_required
def delete_post_image(post_id):
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({"message": "Post not found"}), 404

    if post.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 401

    image = PostImage.query.filter_by(post_id=post_id).first()

    if image is None:
        return jsonify({"message": "Image not found"}), 404

    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Image deleted"})
