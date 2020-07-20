from django.contrib import admin

from .models import FrontPage, FrontText, FrontImage, WorkDate, WorkMonth


class FrontTextInline(admin.TabularInline):
    model = FrontText
    fields = ('text_name', 'text')
    extra = 0


class FrontImageInline(admin.TabularInline):
    model = FrontImage
    fields = ('image_name', 'image')
    extra = 0


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
