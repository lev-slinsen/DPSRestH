"""
Catalogue models.
"""
from django.db import models
from django.utils.translation import ugettext_lazy as _


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
    active = models.BooleanField(verbose_name=_('Active'))

    class Meta:
        verbose_name = _('Pizza')
        verbose_name_plural = _('Pizzas')
        ordering = ('category', 'name')

    def __str__(self):
        return f"{self.category}: {self.name}"
