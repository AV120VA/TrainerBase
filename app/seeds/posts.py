from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    demo_post1 = Post(
        title = 'No hits as usual smh',
        content= 'Stellar Crown hit rates are so bad',
        likes = 0,
        user_id = 1,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post2 = Post(
        title = 'Gardevoir Deck',
        content= 'Will this deck still be good after the 2025 rotation?',
        likes = 0,
        user_id = 1,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post3 = Post(
        title = 'Wolfe Glick is the GOAT',
        likes = 0,
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post4 = Post(
        title = 'Perish Trap',
        content= 'Im copying WolfeyVGCs team',
        likes = 0,
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post5 = Post(
        title = 'Hyped for Legends ZA',
        likes = 0,
        user_id = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post6 = Post(
        title = 'W Starters',
        content= 'Totodile finally getting some love!',
        likes = 0,
        user_id = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    db.session.add(demo_post1)
    db.session.add(demo_post2)
    db.session.add(demo_post3)
    db.session.add(demo_post4)
    db.session.add(demo_post5)
    db.session.add(demo_post6)
    db.session.commit()

def undo_posts():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
            db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
