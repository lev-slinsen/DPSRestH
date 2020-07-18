from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .serializers import FrontPageSerializer, FrontTextSerializer, WorkMonthSerializer
from .models import FrontPage, FrontText, WorkMonth


class FrontPageViewSet(viewsets.ModelViewSet):
    """
    Page API view.
    """
    queryset = FrontPage.objects.all()
    serializer_class = FrontPageSerializer
    http_method_names = ['get']


class FrontTextViewSet(viewsets.ModelViewSet):
    """
    HTML text api view.
    """
    permission_classes = [AllowAny]
    queryset = FrontText.objects.all()
    serializer_class = FrontTextSerializer
    http_method_names = ['get']


class WorkMonthViewSet(viewsets.ModelViewSet):
    """
    Work month API view.
    """
    queryset = WorkMonth.objects.all()
    serializer_class = WorkMonthSerializer
    http_method_names = ['get']
