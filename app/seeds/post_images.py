from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_post_images():
    demo_post_image1 = PostImage(
        post_id = 1,
        image_url = "https://i.imgur.com/6pz0q5A.png",
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post_image2 = PostImage(
        post_id = 3,
        image_url = "https://i.imgur.com/5Y7rx1n.png",
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_post_image3 = PostImage(
        post_id = 5,
        image_url = "https://i.imgur.com/4YbzINj.png",
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    db.session.add(demo_post_image1)
    db.session.add(demo_post_image2)
    db.session.add(demo_post_image3)
    db.session.commit()

def undo_post_images():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
            db.session.execute(text("DELETE FROM post_images"))
    db.session.commit()
