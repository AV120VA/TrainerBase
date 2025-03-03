from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment
from app.models.db import db

comment_routes = Blueprint('comments', __name__)

# Get all comments for a post
@comment_routes.route('/post/<int:post_id>', methods=["GET"])
def comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id)
    if comments is None:
        return jsonify({'message': 'No comments found'}), 404
    return jsonify({"Comments": [comment.to_dict() for comment in comments]})

# Get All User Comments
@comment_routes.route('/current', methods=["GET"])
@login_required
def user_comments():
    comments = Comment.query.filter(Comment.user_id == current_user.id)
    return jsonify({"Comments": [comment.to_dict() for comment in comments]})

# Create a Comment
@comment_routes.route('/', methods=["POST"])
@login_required
def new_comment():
    data = request.json

    if not data or not data.get('content'):
        return jsonify({"message": "Content is required"}), 400

    comment_data = {
        "content": data['content'],
        'user_id': current_user.id,
        'post_id': data['post_id']
    }

    comment = Comment(**comment_data)
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.to_dict())
