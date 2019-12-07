import random
import string

from database import Session, User

names = ['Igor', 'Vasiliy', 'Ekaterina', 'Alex', 'Alina', 'Anastasia', 'Petr', 'Ivan', 'Anton']
second_names = ['Beschastnov', 'Kovalev', 'Lenov', 'Vaskov', 'Trubov', 'Petrov', 'Sidorov']

address_pull = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
    'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in '
    'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat '
    'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split()
)


def generate_users():
    db = Session()
    logins = []
    for _ in range(20):
        while True:
            login = random.choice(names) + ' ' + random.choice(second_names)
            if login not in logins:
                logins.append(login)
                break
        db_user = User(
            login=login,
            address=' '.join(random.choices(address_pull, k=5))
            + ', '.join(random.choices(string.digits)),
        )
        db.add(db_user)
    db.commit()


if __name__ == '__main__':
    generate_users()
