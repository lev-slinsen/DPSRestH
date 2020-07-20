"""DPSRestH URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework import routers

from catalog import views as catalog_views
from front import views as front_views

# from shop import views as shop_views


schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'pizza', catalog_views.PizzaViewSet)
router.register(r'filter', catalog_views.FilterViewSet)
router.register(r'front-page', front_views.FrontPageViewSet)
router.register(r'front-text', front_views.FrontTextViewSet)
router.register(r'work-month', front_views.WorkMonthViewSet)
# router.register(r'order', shop_views.OrderViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest/', include(router.urls)),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # path(r"", views.index, name="index"),
    # path(r"about/", views.index, name="about"),
    # path(r"cart/", views.index, name="cart"),
    # path(r"order/", views.index, name="order"),
    # path(r"catalog/", views.index, name="catalog"),
]
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += staticfiles_urlpatterns()
