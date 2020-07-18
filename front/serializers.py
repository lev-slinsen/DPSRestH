from .models import FrontPage, FrontText, FrontImage, WorkDate, WorkMonth
from rest_framework import serializers


class FrontTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontText
        fields = ('text_name', 'text')


class FrontImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontImage
        fields = ('image_name', 'image')


class FrontPageSerializer(serializers.ModelSerializer):
    front_text = serializers.SerializerMethodField()
    front_image = serializers.SerializerMethodField()

    def get_front_text(self, obj):
        texts = obj.fronttext_set.all()
        return FrontTextSerializer(texts, many=True).data

    def get_front_image(self, obj):
        images = obj.frontimage_set.all()
        return FrontImageSerializer(images, many=True).data

    class Meta:
        model = FrontPage
        fields = ('page_name', 'front_text', 'front_image')


class WorkDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkDate
        fields = ('date',)


class WorkMonthSerializer(serializers.ModelSerializer):
    work_dates = serializers.SerializerMethodField()

    def get_work_dates(self, obj):
        dates = obj.workdate_set.all()
        return WorkDateSerializer(dates, many=True).data

    class Meta:
        model = WorkMonth
        fields = ('month', 'work_dates')
