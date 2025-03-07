from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    post = db.relationship('Post', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
