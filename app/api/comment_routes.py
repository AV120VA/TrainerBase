from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, User
from app.models.db import db

comment_routes = Blueprint('comments', __name__)

# Get all comments for a post
@comment_routes.route('/post/<int:post_id>', methods=["GET"])
def comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id)
    result = []
    if comments is None:
        return jsonify({'message': 'No comments found'}), 404

    for comment in comments:
        user = User.query.get(comment.user_id)
        comment_dict = comment.to_dict()

        comment_dict['User'] = {
            'username': user.username,
            'user_id': user.id
        }

        result.append(comment_dict)

    return jsonify({"Comments": result})

# Get All User Comments
@comment_routes.route('/current', methods=["GET"])
@login_required
def user_comments():
    comments = Comment.query.filter(Comment.user_id == current_user.id)
    result = []
    if comments is None:
        return jsonify({'message': 'No comments found'}), 404

    for comment in comments:
        user = User.query.get(comment.user_id)
        comment_dict = comment.to_dict()

        comment_dict['User'] = {
            'username': user.username,
            'user_id': user.id
        }

        result.append(comment_dict)

    return jsonify({"Comments": result})

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

    comment_dict = comment.to_dict()
    user = User.query.get(comment.user_id)
    comment_dict['User'] = {
        'username': user.username,
        'user_id': user.id
    }

    return jsonify(comment_dict)

# Edit a Comment
@comment_routes.route('/<int:comment_id>', methods=["PUT"])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    if comment.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json

    if not data:
        return jsonify({"message": "Invalid data"}), 400

    comment.content = data['content']
    db.session.commit()

    return jsonify(comment.to_dict())

# Delete a Comment
@comment_routes.route('/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment is None:
        return jsonify({"message": "Comment not found"}), 404

    if comment.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted"})
