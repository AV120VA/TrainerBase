from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    demo_comment1 = Comment(
        content = 'I feel your pain',
        post_id = 1,
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_comment2 = Comment(
        content = 'I hope not, Gardy is my nemesis',
        post_id = 2,
        user_id = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_comment3 = Comment(
        content = '1400 people, and it wasnt enough!',
        post_id = 3,
        user_id = 1,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_comment4 = Comment(
        content = 'Immediate report lol',
        post_id = 4,
        user_id = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_comment5 = Comment(
        content = 'W new battle mechanics',
        post_id = 5,
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_comment6 = Comment(
        content = 'Totodile supremacy',
        post_id = 5,
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    db.session.add(demo_comment1)
    db.session.add(demo_comment2)
    db.session.add(demo_comment3)
    db.session.add(demo_comment4)
    db.session.add(demo_comment5)
    db.session.add(demo_comment6)
    db.session.commit()

def undo_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
            db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
