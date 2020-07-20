from django.db import models
from django.utils.translation import ugettext_lazy as _


class FrontPage(models.Model):
    page_name = models.CharField(verbose_name=_('HTML page'),
                                 max_length=100,
                                 unique=True)

    class Meta:
        verbose_name = _('HTML page')
        verbose_name_plural = _('HTML pages')

    def __str__(self):
        return f"{self.page_name}"


class FrontText(models.Model):
    text = models.TextField(verbose_name=_('HTML text'),
                            max_length=1000)
    text_name = models.CharField(verbose_name=_('HTML text name'),
                                 max_length=20,
                                 unique=True)
    front_page = models.ForeignKey(FrontPage, on_delete=models.CASCADE)

    def __str__(self):
        return f""


class FrontImage(models.Model):
    image = models.ImageField(verbose_name=_('HTML image'))
    image_name = models.CharField(verbose_name=_('HTML image name'),
                                  max_length=20,
                                  unique=True)
    front_page = models.ForeignKey(FrontPage, on_delete=models.CASCADE)

    def __str__(self):
        return f""


class WorkMonth(models.Model):
    MONTH_CHOICES = (
        (1, _('January')),
        (2, _('February')),
        (3, _('March')),
        (4, _('April')),
        (5, _('May')),
        (6, _('June')),
        (7, _('July')),
        (8, _('August')),
        (9, _('September')),
        (10, _('October')),
        (11, _('November')),
        (12, _('December')),
    )
    month = models.SmallIntegerField(verbose_name=_('Month'),
                                     choices=MONTH_CHOICES)
    id = models.PositiveSmallIntegerField(verbose_name=_('Month id'),
                                          primary_key=True)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    class Meta:
        verbose_name = _('Month')
        verbose_name_plural = _('Months')

    def __str__(self):
        return f"{self.month}"


class WorkDate(models.Model):
    date = models.DateField(unique=True, verbose_name=_('Date'))
    month = models.ForeignKey(WorkMonth, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Date')
        verbose_name_plural = _('Dates')

    def __str__(self):
        return f"{self.date}"
