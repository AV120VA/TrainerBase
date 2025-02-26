from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class PostTag(db.Model):
    __tablename__ = 'post_tags'

    if environment == 'production':
        __table_args__ = (
            db.PrimaryKeyConstraint('post_id', 'tag_id'),
            {'schema': SCHEMA}
        )
    else:
        __table_args__ = (
            db.PrimaryKeyConstraint('post_id', 'tag_id'),
        )

    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            'post_id': self.post_id,
            'tag_id': self.tag_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
