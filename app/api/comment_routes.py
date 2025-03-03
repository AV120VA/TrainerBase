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
