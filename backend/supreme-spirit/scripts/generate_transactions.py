import random

from crud.user import get_users

from database import Account, Session, Transaction

names_pull = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
    'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in '
    'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat '
    'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split()
)
currencies = ['rub', 'euro', 'dollar']


def generate_accounts_and_transactions():
    db = Session()
    list_of_users = get_users(db)
    for _ in range(20):
        from_user = random.choice(list_of_users).id
        to_user = random.choice(list_of_users).id
        db_account = Account(
            name=random.choice(names_pull),
            balance=random.randint(10000, 1000000000),
            currency=random.choice(currencies),
            user_id=from_user,
            type=random.randint(1, 3),
            interest=random.random() * 10,
        )

        db_account2 = Account(
            name=random.choice(names_pull),
            balance=random.randint(10000, 1000000000),
            currency=random.choice(currencies),
            user_id=to_user,
            type=random.randint(1, 3),
            interest=random.random() * 10,
        )

        db.add(db_account)
        db.add(db_account2)
        db.commit()
        db.refresh(db_account)
        db.refresh(db_account2)

        db_transaction = Transaction(
            from_user_id=from_user,
            to_user_id=to_user,
            from_account_id=db_account.id,
            to_account_id=db_account2.id,
            amount=random.randint(1, db_account.balance),
        )

        db.add(db_transaction)

    db.commit()


if __name__ == '__main__':
    generate_accounts_and_transactions()
