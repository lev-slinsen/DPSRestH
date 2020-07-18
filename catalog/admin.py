from django.contrib import admin

from django.db import models
from django.forms import CheckboxSelectMultiple
from django.utils.safestring import mark_safe

from .models import Pizza, Filter


@admin.register(Pizza)
class PizzaAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('filter__name', 'category')
    fields = ('name', 'category', 'price', 'text_short', 'text_long', 'photo', 'filter', 'active')
    readonly_fields = ('photo_preview',)

    def photo_preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.photo_thumbnail.url,
            width=obj.photo_thumbnail.width,
            height=obj.photo_thumbnail.height,
            )
        )

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


admin.site.register(Filter)
