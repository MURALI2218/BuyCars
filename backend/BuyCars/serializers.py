from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Car_Detail_Model, Car_Buy_Model, Car_Status_Model

class UserSerialiers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password' : {"write_only" :True}}


    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class Car_Detailserializers(serializers.ModelSerializer):
    class Meta:
        model = Car_Detail_Model
        fields = "__all__"
        extra_kwargs = {'owner' : {'read_only':True}}


class Cars_statusserializers(serializers.ModelSerializer):
    class Meta:
        model = Car_Status_Model
        fields = "__all__"

class Car_Buyserializers(serializers.ModelSerializer):
    class Meta:
        model = Car_Buy_Model
        fields = "__all__"
        extra_kwargs = {'buyer' : {'read_only':True}}