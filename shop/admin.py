import io

import reportlab
from django.conf import settings
from django.contrib import admin
from django.contrib.admin.widgets import RelatedFieldWidgetWrapper
from django.http import FileResponse
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

from .models import Order
from .models import OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    fields = ('pizza', 'quantity', 'price_admin',)
    readonly_fields = ('price_admin',)
    extra = 0
    ordering = ('pizza',)

    def formfield_for_dbfield(self, db_field, *args, **kwargs):
        """
        Remove popup add/edit/delete icons by default for relation fields.
        """
        if db_field.is_relation:
            rel = db_field.related_model
            wrapped_widget = RelatedFieldWidgetWrapper(
                db_field.formfield().widget,
                rel,
                admin.site,
                can_add_related=False,
                can_change_related=False,
                can_delete_related=False
            )
            db_field.formfield().widget = wrapped_widget
            return db_field.formfield()
        return super(OrderItemInline, self).formfield_for_dbfield(db_field, **kwargs)


def make_confirmed(modeladmin, request, queryset):
    queryset.update(status=True)


make_confirmed.short_description = _('Confirm selected orders')


def print_orders(modeladmin, request, queryset):
    date = f"{timezone.now().day}.{timezone.now().month}.{timezone.now().year}"

    # Registering fonts
    reportlab.rl_config.TTFSearchPath.append(str(settings.BASE_DIR) + '/media/fonts')
    pdfmetrics.registerFont(TTFont('PT Mono', 'PTMono-Regular.ttf'))
    pdfmetrics.registerFont(TTFont('PT Mono bold', 'PTMono-Bold.ttf'))

    # Create a file-like buffer to receive PDF data.
    buffer = io.BytesIO()

    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer)

    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    for item in queryset:
        order_items = OrderItem.objects.filter(order=item.id)
        """
        Document contains:
        80-400 horizontally
        750-100 vertically
        """
        # Header
        p.setFont(psfontname='PT Mono bold', size=10)
        p.drawString(80, 750, f'Пекарня "Печорин"')
        p.drawString(250, 750, f"pechorin.by")
        p.drawString(400, 750, f"тел. +375 (33) 658-02-20")
        p.line(70, 740, 560, 740)

        # Order information
        p.setFont(psfontname='PT Mono', size=8)
        p.drawString(80, 720, f"Способ оплаты: {item.get_payment_display()}")
        p.drawString(250, 720, f"Имя: {item.first_name}")

        p.drawString(80, 710, f"Дата: {date}")
        p.drawString(250, 710, f"Телефон: {item.phone}")

        p.drawString(80, 700, f"Адрес: {item.address}")
        if item.comment:
            p.drawString(80, 690, f"Комментарий: {item.comment}")

        # Table header
        p.setFont(psfontname='PT Mono bold', size=9)
        p.drawString(100, 650, f"Товарный чек № {item.id} от {date} г.")

        # Table
        p.setFont(psfontname='PT Mono', size=7)
        table_vert = 615
        n = len(order_items)
        order_price = 0
        for oi in order_items:
            single = oi.price / oi.quantity
            p.drawString(80, table_vert, f"Товар #{n}: {oi.pizza}")
            p.drawString(320, table_vert, f"Кол-во: {oi.quantity}")
            p.drawString(380, table_vert, f"Цена: {single}")
            p.drawString(440, table_vert, f"Сумма: {oi.price}")

            n -= 1  # For some reason this count defies logic, don't ask
            order_price += oi.price
            table_vert += 10

        # Table footer
        footer_vert = 605 - 10*len(order_items)
        p.setFont(psfontname='PT Mono', size=9)
        p.drawString(80, footer_vert, f"Общая сумма: {order_price} | "
                               f"Скидка: {item.discount}% | "
                               f"Общая сумма с учётом скидки: {item.total_price()}")

        # Footer
        p.setFont(psfontname='PT Mono', size=7)
        p.drawString(80, 170, f"Продавец _______ | _______")
        p.setFont(psfontname='PT Mono', size=5)
        p.drawString(120, 165, f"подпись       фио")

        p.setFont(psfontname='PT Mono bold', size=11)
        p.drawString(80, 130, f"Приятного аппетита!")

        # Close the page object cleanly, and we're done.
        p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    return FileResponse(buffer,
                        as_attachment=True,
                        filename=f'Заказы от {date}.pdf')


print_orders.short_description = _('Print orders')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('total_price',)
    list_display = (
        'phone',
        'id',
        'status',
        'address',
        'delivery_date',
        'delivery_time',
        'first_name',
        'total_price',
        'payment',
        'discount',
    )
    date_hierarchy = 'delivery_date'
    exclude = ('user',
               'order_items',
               'order_price')
    inlines = (OrderItemInline,)
    actions = (make_confirmed,
               print_orders)
