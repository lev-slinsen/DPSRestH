import logging

from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _

from catalog.models import Pizza

log = logging.getLogger(__name__)


class Order(models.Model):
    DELIVERY_TIME_CHOICES = [
        (0, '09-10'),
        (1, '10-11'),
        (2, '11-12'),
        (3, '12-13'),
        (4, '13-14'),
        (5, '14-15'),
        (6, '15-16'),
        (7, '16-17'),
        (8, '17-18'),
        (9, '18-18.30'),
    ]
    PAYMENT_CHOICES = [
        (0, _('Cash')),
        (1, _('Card')),
        (2, _('Online')),
    ]
    phone = models.CharField(max_length=9,
                             verbose_name=_('Phone'))
    first_name = models.CharField(max_length=25,
                                  verbose_name=_('Name'))
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_('Created at'))
    delivery_date = models.DateField(verbose_name=_('Delivery date'))
    delivery_time = models.SmallIntegerField(choices=DELIVERY_TIME_CHOICES,
                                             verbose_name=_('Delivery time'))
    address = models.CharField(max_length=60,
                               verbose_name=_('Address'))
    comment = models.TextField(max_length=60,
                               blank=True,
                               null=True,
                               verbose_name=_('Comment'))
    payment = models.SmallIntegerField(choices=PAYMENT_CHOICES,
                                       verbose_name=_('Payment method'))
    status = models.BooleanField(default=0,
                                 verbose_name=_('Confirmed'))
    discount = models.SmallIntegerField(default=0,
                                        validators=[MinValueValidator(0), MaxValueValidator(100)],
                                        verbose_name=_('Discount'))
    order_price = models.FloatField(default=0,
                                    verbose_name=_('Order price'))

    "Field validation for admin"
    def clean(self):
        if len(self.phone) != 9:
            raise ValidationError(_('Phone must be 9 digits long'))
        elif self.phone.isdigit() == False:
            raise ValidationError(_('Phone must only contain digits'))

    "For total_price"
    order_items = models.CharField(max_length=100)

    def total_price(self):
        price = sum([item.price for item in self.orderitem_set.all()])
        discount = 1 - self.discount / 100
        final_price = round(float(price) * float(discount), 2)
        return final_price

    "Total price field in Admin"
    total_price.allow_tags = True
    total_price.short_description = _('Total price')

    def __str__(self):
        return f"№ {self.id}"

    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')


class OrderItem(models.Model):
    order = models.ForeignKey(Order,
                              on_delete=models.CASCADE,
                              verbose_name=_('Order'))
    pizza = models.ForeignKey(Pizza,
                              on_delete=models.CASCADE,
                              verbose_name=_('Item'))
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)],
                                                verbose_name=_('Quantity'))

    @property
    def price(self):
        return self.pizza.price * self.quantity

    "For API"
    def pizza_id(self):
        return self.pizza.id

    "Property translation on admin panel"
    def price_admin(self):
        return self.price
    price_admin.short_description = _('Price')

    def __str__(self):
        return f"{self.pizza.category}"

    class Meta:
        verbose_name = _('Item')
        verbose_name_plural = _('Items')


def order_email(sender, instance, created, **kwargs):
    if created:
        try:
            subject = 'Новый заказ'
            from_email = 'Печорин'
            to = 'pechorinby@gmail.com'
            site = 'https://pechorin.by'
            text_content = f'{site}/admin/shop/order/{instance.id}/change'
            html_content = f'<a href={site}/admin/shop/order/{instance.id}/change>Новый заказ</a>'
            # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            # msg.attach_alternative(html_content, "text/html")
            # msg.send(fail_silently=False)
            send_mail(subject, text_content, from_email, [to], fail_silently=False, html_message=html_content)
        except Exception as ex:
            log.error(ex)


post_save.connect(order_email, sender=Order)
