"""
Catalogue models.
"""
import sys

from django.db import models
from django.utils.translation import ugettext_lazy as _

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

from django.db.models.signals import post_save
from django.dispatch import receiver


class Filter(models.Model):
    """
    Filter model, multi choice
    """
    name = models.CharField(max_length=100,
                            verbose_name=_('Filter'),
                            unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Filter')
        verbose_name_plural = _('Filters')


class Pizza(models.Model):
    """
    Pizza model.
    """
    CATEGORY_CHOICES = (
        (1, _('Category 1')),
        (2, _('Category 2')),
        (3, _('Category 3')),
        (4, _('Category 4'))
    )
    name = models.CharField(max_length=45,
                            verbose_name=_('Pizza name'))
    price = models.DecimalField(default=0,
                                max_digits=6,
                                decimal_places=2,
                                verbose_name=_('Price'))
    text_short = models.CharField(max_length=100,
                                  verbose_name=_('Short text'))
    text_long = models.TextField(verbose_name=_('Long text'))
    filter = models.ManyToManyField(Filter,
                                    verbose_name=_('Filter'))
    category = models.SmallIntegerField(choices=CATEGORY_CHOICES,
                                        verbose_name=_('Category'))
    photo = models.ImageField(upload_to='images/',
                              verbose_name=_('Image'),)
    photo_thumbnail = ImageSpecField(source='photo',
                                     processors=[ResizeToFill(100, 100)],
                                     format='JPEG',
                                     options={'quality': 90},)
    active = models.BooleanField(verbose_name=_('Active'))

    class Meta:
        verbose_name = _('Pizza')
        verbose_name_plural = _('Pizzas')
        ordering = ('category', 'name')

    def __str__(self):
        return f"{self.category}: {self.name}"


@receiver(post_save, sender=Pizza)
def my_handler(sender, instance, **kwargs):
    print('TEST', instance.photo, instance.photo_thumbnail)
    sys.stdout.flush()
