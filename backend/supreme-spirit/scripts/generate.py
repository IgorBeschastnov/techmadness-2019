from scripts.generate_transactions import generate_accounts_and_transactions
from scripts.generate_users import generate_users


def generate_all():
    generate_users()
    generate_accounts_and_transactions()


if __name__ == '__main__':
    generate_all()
