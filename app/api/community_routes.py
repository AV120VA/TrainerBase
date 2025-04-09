from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Community, User, Post
from app.models.db import db

community_routes = Blueprint('communities', __name__)

# Get all communities
@community_routes.route('/', methods=["GET"])
def communities():
    communities = Community.query.all()

    result = []

    for community in communities:
        community_dict = community.to_dict()
        result.append(community_dict)
    return jsonify({"Communities": result})

# Get a community by ID
@community_routes.route('/<int:community_id>', methods=["GET"])
def community(community_id):
    community = Community.query.get(community_id)

    if community is None:
        return jsonify({"error": "Community not found"}), 404

    return jsonify({"Community": community.to_dict()})

# Get all posts in a community
@community_routes.route('/<int:community_id>/posts', methods=["GET"])
def community_posts(community_id):
    community = Community.query.get(community_id)
    if community is None:
        return jsonify({"error": "Community not found"}), 404
    posts = community.to_dict(include_posts=True)['posts']

    return jsonify({"Posts": posts})

# Create a new community
@community_routes.route('/', methods=["POST"])
@login_required
def create_community():
    data = request.json

    if not data or not data.get('name'):
        return jsonify({"error": "Community name is required"}), 400

    community_data = {
        "name": data['name'],
        "user_id": current_user.id,
    }

    if 'description' in data:
        community_data['description'] = data['description']

    community = Community(**community_data)
    db.session.add(community)
    db.session.commit()

    return jsonify(community.to_dict())

# Delete a community
@community_routes.route('/<int:community_id>', methods=["DELETE"])
@login_required
def delete_community(community_id):
    community = Community.query.get(community_id)
    if community is None:
        return jsonify({"error": "Community not found"}), 404

    if community.user_id != current_user.id:
        return jsonify({"error": "You do not have permission to delete this community"}), 403

    db.session.delete(community)
    db.session.commit()

    return jsonify({"message": "Community deleted successfully"})
