from django.core.management.base import BaseCommand

from catalog.models import Filter
from front.models import FrontPage, FrontText, FrontImage, WorkMonth


class Command(BaseCommand):
    """
    Creates front objects according to front-end requirements.

    IDs are necessary to not allow duplicates,
    even with `unique=True` they are still being created.
    """

    def _create_filters(self):
        filter0 = Filter(name='С мясом',
                         id=0)
        filter0.save()

        filter1 = Filter(name='Без мяса',
                         id=1)
        filter1.save()

        filter2 = Filter(name='Сладние',
                         id=2)
        filter2.save()

        filter3 = Filter(name='Лёгкие',
                         id=3)
        filter3.save()

    def _create_front(self):
        "Cross-page objects"
        page = FrontPage(id=0, page_name='cross')
        page.save()

        text = FrontText(id=0,
                         text_name='header time',
                         text='Мы работаем с пн.-пт. с 8 до 19.00',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=1,
                         text_name='header phone',
                         text='+375 (33) 658-02-20',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=2,
                         text_name='req1',
                         text='Общество с ограниченной ответственностью «Печь Орин»',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=3,
                         text_name='req2',
                         text='220035, г. Минск, ул. Бачило, д. 18',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=4,
                         text_name='req3',
                         text='УНП 192810299',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=5,
                         text_name='req4',
                         text='Регистрационный номер в ТР РБ: 402852',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=6,
                         text_name='cont1',
                         text='Телефон: +375 33 6580220',
                         front_page=FrontPage(pk=0))
        text.save()

        text = FrontText(id=7,
                         text_name='cont2',
                         text="""
                         E-mail: info@pechorin.by
                         Сайт: pechorin.by""",
                         front_page=FrontPage(pk=0))
        text.save()

        "Index page"
        page = FrontPage(id=1, page_name='index')
        page.save()

        image = FrontImage(id=0,
                           image_name='carousel image 1',
                           front_page=FrontPage(pk=1))
        image.save()

        image = FrontImage(id=1,
                           image_name='carousel image 2',
                           front_page=FrontPage(pk=1))
        image.save()

        image = FrontImage(id=2,
                           image_name='carousel image 3',
                           front_page=FrontPage(pk=1))
        image.save()

        "About page"
        page = FrontPage(id=2, page_name='about')
        page.save()

        text = FrontText(id=2,
                         text_name='head1',
                         text='О нас',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=8,
                         text_name='article1',
                         text='Пекарня Печорин предлагает Вам выпечку по оригинальным рецептам '
                              'основанных на классической славянской кухне. '
                              'Тонкое, без дрожжевое тесто, много разнообразной начинки, '
                              'это и есть настоящие, правильные пирожки. '
                              'Мы предлагаем только свежую выпечку, '
                              'Наши кондитера приготовят и отпекут Ваш заказ непосредственно перед доставкой. '
                              'Вы можете самостоятельно собрать набор из нашего ассортимента для любого случая. '
                              'Накрыть стол для друзей, коллег по работе, организовать фуршет. '
                              'Каждый найдет в нашем ассортименте пирог по своему вкусу.',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=9,
                         text_name='head2',
                         text='О сервисе',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=10,
                         text_name='article2',
                         text='Мы работаем с понедельника по пятницу, по рабочим дням. '
                              'Заказы сегодня на сегодня принимаются только по телефону до 12-30. '
                              'Время для приготовления и доставки занимает от 1,5 часов, '
                              'и зависит от величины заказа и района доставки. '
                              'Если Вам нужно приготовить большой заказ или важно время доставки, '
                              'пожалуйста, сделайте заказ заранее.',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=11,
                         text_name='head3',
                         text='Для юридических лиц',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=12,
                         text_name='article3',
                         text='Если Вы хотите сделать заказ на организацию, '
                              'с оплатой по безналичному расчету. '
                              'Пришлите, пожалуйста, Ваш заказ и реквизиты на наш e-mail: info@pechorin.by. '
                              'Мы также осуществляем поставки нашей продукции на регулярной (договорной) основе '
                              'для ИП и юр.лиц для реализации или корпоративного питания.',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=13,
                         text_name='head4',
                         text='Доставка',
                         front_page=FrontPage(pk=2))
        text.save()

        text = FrontText(id=14,
                         text_name='article4',
                         text='Доставка осуществляется нашими курьерами с 9-00 до 18-30.',
                         front_page=FrontPage(pk=2))
        text.save()

        image = FrontImage(id=3,
                           image_name='header',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=4,
                           image_name='quatro1',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=5,
                           image_name='quatro2',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=6,
                           image_name='quatro3',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=7,
                           image_name='quatro4',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=8,
                           image_name='aboutMiddle1',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=9,
                           image_name='aboutMiddle2',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=10,
                           image_name='quatro11',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=11,
                           image_name='quatro12',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=12,
                           image_name='quatro13',
                           front_page=FrontPage(pk=2))
        image.save()

        image = FrontImage(id=13,
                           image_name='quatro14',
                           front_page=FrontPage(pk=2))
        image.save()

        "Order page"
        page = FrontPage(id=3, page_name='order')
        page.save()

        text = FrontText(id=15,
                         text_name='modal1',
                         text='Ваш заказ успешно принят',
                         front_page=FrontPage(pk=3))
        text.save()

        text = FrontText(id=16,
                         text_name='modal2',
                         text='Спасибо за заказ. В ближайшее время с вами свяжутся по указанному телефону.',
                         front_page=FrontPage(pk=3))
        text.save()

    def _create_months(self):
        for m in range(1, 13):
            month = WorkMonth(id=m, month=m)
            month.save()

    def handle(self, *args, **options):
        self._create_filters()
        self._create_front()
        self._create_months()
