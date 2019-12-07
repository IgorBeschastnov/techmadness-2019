import random
import string

from database import Session, User

names = ['Igor', 'Vasiliy', 'Ekaterina', 'Alex', 'Alina', 'Anastasy']
second_names = ['Beschastnov', 'Kovalev', 'Lenov', 'Vaskov']

address_pull = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
    'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in '
    'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat '
    'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split()
)


def generate_users():
    db = Session()
    for _ in range(20):
        db_user = User(login=random.choice(names) + ' ' + random.choice(second_names),
                       address=' '.join(random.choices(description_pull, k=5)) + ', '.join(random.choices(string.digits)))
        db.add(db_user)
        db.commit()
        db.refresh(db_user)


generate_users()