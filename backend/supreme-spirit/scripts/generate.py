from scripts.generate_transactions import generate_accounts_and_transactions
from scripts.generate_users import generate_users
from scripts.generate_offet_template import generate_templates

def generate_all():
    generate_users()
    generate_accounts_and_transactions()
    generate_templates()


if __name__ == '__main__':
    generate_all()
