from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import FrontPage, FrontText, FrontImage, WorkDate, WorkMonth


class FrontTextInline(admin.TabularInline):
    model = FrontText
    fields = ('text_name', 'text')
    extra = 0


class FrontImageInline(admin.TabularInline):
    model = FrontImage
    fields = ('image_name', 'image', 'image_preview')
    readonly_fields = ('image_preview',)
    extra = 0

    def image_preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.image.url,
            width=obj.image.width,
            height=obj.image.height,
            )
        )


@admin.register(FrontPage)
class FrontPageAdmin(admin.ModelAdmin):
    model = FrontPage
    inlines = (FrontTextInline, FrontImageInline)


class WorkDateInline(admin.TabularInline):
    model = WorkDate


@admin.register(WorkMonth)
class WorkMonthAdmin(admin.ModelAdmin):
    model = WorkMonth
    list_display = ('month',)
    ordering = ('month',)
    readonly_fields = ('month', 'id')
    inlines = (WorkDateInline,)
