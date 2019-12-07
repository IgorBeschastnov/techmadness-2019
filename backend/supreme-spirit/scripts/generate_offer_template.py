import random

from database import OfferTemplate, Session
from database.models.models import OfferType


def generate_templates():
    db = Session()

    credit_1 = OfferTemplate(
        text='#МожноСЧЕТ',
        type=OfferType.CREDIT,
        data={
            'description': 'Комфортное'
            ' управление без ограничений: чем выше '
            ' остаток — тем больше доход',
            'interest': 10,
            'amount': 120000,
        },
    )

    deposit_1 = OfferTemplate(
        text='Вклад «150 лет надежности»',
        type=OfferType.DEPOSIT,
        data={
            'description': 'Высокий доход даже' ' с небольшой суммы вклада',
            'interest': 5.7,
            'amount': 15000,
        },
    )

    deposit_2 = OfferTemplate(
        text='Вклад «Прогрессивный»',
        type=OfferType.DEPOSIT,
        data={
            'description': 'Регулярное получение' ' дохода по высокой ставке',
            'interest': 5.7,
            'amount': 500000,
        },
    )

    mortage_1 = OfferTemplate(
        text='Новостройка',
        type=OfferType.MORTGAGE,
        data={
            'description': 'Широкий выбор квартир'
            ' в новостройках и минимальные'
            ' сроки принятия решения',
            'interest': 6.99,
            'amount': 1500000,
        },
    )

    mortage_2 = OfferTemplate(
        text='Готовое жилье',
        type=OfferType.MORTGAGE,
        data={
            'description': 'Купите столько'
            ' квадратных метров, сколько вам необходимо'
            ' с нашей базовой ипотечной программой',
            'interest': 6.99,
            'amount': 1000000,
        },
    )

    deposit_3 = OfferTemplate(
        text='Сберегательный счёт',
        type=OfferType.DEPOSIT,
        data={
            'description': 'Классический инструмент' ' для свободного управления накоплениями',
            'interest': 5.9,
            'amount': 0,
        },
    )
    db.add(credit_1)
    db.add(deposit_1)
    db.add(deposit_2)
    db.add(mortage_1)
    db.add(mortage_2)
    db.add(deposit_3)

    db.commit()


if __name__ == '__main__':
    generate_templates()
