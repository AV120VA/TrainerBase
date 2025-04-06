from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .posttag import PostTag

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text(), nullable=True)
    likes = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)  # Add this line
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    tags = relationship('Tag', secondary=add_prefix_for_prod('post_tags'), back_populates='posts')
    community = relationship('Community', back_populates='posts')
    image = relationship('PostImage', uselist=False, back_populates='post', cascade='all, delete-orphan')
    comments = relationship('Comment', back_populates='post', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'likes': self.likes,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'tags': [tag.to_dict() for tag in self.tags],
            'image': self.image.to_dict() if self.image else None
        }
