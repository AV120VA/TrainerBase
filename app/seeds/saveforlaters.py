from app.models import db, SaveForLater, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_saveforlater():
    demo_saveforlater1 = SaveForLater(
        user_id=1,
        post_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    demo_saveforlater2 = SaveForLater(
        user_id=1,
        post_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(demo_saveforlater1)
    db.session.add(demo_saveforlater2)
    db.session.commit()

def undo_saveforlater():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.save_for_laters RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM save_for_laters"))
    db.session.commit()
