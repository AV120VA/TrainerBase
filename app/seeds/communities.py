from app.models import db, Community, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_communities():
    demo_community1 = Community(
        name = 'PKMN',
        description= 'A community for all things Pokemon!',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        user_id = 2
    )
    demo_community2 = Community(
        name = 'VGC',
        description= 'A community for all things VGC!',
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    demo_community3 = Community(
        name = 'TGC',
        description= 'A community for all things TCG!',
        created_at = datetime.now(),
        user_id = 2,
        updated_at = datetime.now()
    )
    demo_community4 = Community(
        name = 'GO',
        description= 'A community for all things Pokemon Go!',
        user_id = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )

    db.session.add(demo_community1)
    db.session.add(demo_community2)
    db.session.add(demo_community3)
    db.session.add(demo_community4)
    db.session.commit()

def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities"))

    db.session.commit()
