from rest_framework import serializers

from .models import Pizza, Filter


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('name',)


class PizzaSerializer(serializers.ModelSerializer):
    filter = FilterSerializer(read_only=True, many=True)

    class Meta:
        model = Pizza
        fields = ('id',
                  'name',
                  'category',
                  'price',
                  'text_short',
                  'text_long',
                  'photo',
                  'filter')
