import random
import string

from crud.user import get_users

from database import Account, Session

names_pull = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
    'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in '
    'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat '
    'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split()
)
currencies = ['rub', 'euro', 'dollar']
  "interest": 0


def generate_accounts():
    db = Session()
    list_of_users = get_users(db)
    for _ in range(20):
        from_user=random.choices(list_of_users.user_id)
        to_user=random.choices(list_of_users.user_id)
        db_account = Account(name=' '.join(random.choices(description_pull, k=2)),
                          balance=randint(10000, 1000000000),
                          currency=random.choice(currencies),
                          user_id=from_user,
                          type=randint(1,3),
                          interest=random()*10)

        db_account2 = Account(name=' '.join(random.choices(description_pull, k=2)),
                          balance=randint(10000, 1000000000),
                          currency=random.choice(currencies),
                          user_id=to_user,
                          type=randint(1,3),
                          interest=random()*10)

        db_transaction = Transaction(from_user_id=from_user,
                          to_user_id=to_user,
                          from_account_id=db_account.account_id,
                          to_account_id=db_account2.account_id,
                          amount=randint(1,db_account.balance))
                          
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)


generate_accounts()
