from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Car_Detail_Model, Car_Buy_Model, Car_Status_Model, carfueltype_model, cargeartype_model

class UserSerialiers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password' : {"write_only" :True}}


    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class carfueltypeserializers(serializers.ModelSerializer):
    class Meta:
        model = carfueltype_model
        fields = "__all__"

class cargeartypeserializers(serializers.ModelSerializer):
    class Meta:
        model = cargeartype_model
        fields = "__all__"

class Cars_statusserializers(serializers.ModelSerializer):
    class Meta:
        model = Car_Status_Model
        fields = "__all__"

class Car_Detailserializers(serializers.ModelSerializer):

    owner = UserSerialiers(read_only=True)
    fueltype = carfueltypeserializers(read_only=True)
    geartype = cargeartypeserializers(read_only=True)
    post_status = Cars_statusserializers(read_only=True)

    fueltype_id = serializers.PrimaryKeyRelatedField(
        queryset=carfueltype_model.objects.all(),
        source='fueltype',
        write_only=True
    )

    geartype_id = serializers.PrimaryKeyRelatedField(
        queryset=cargeartype_model.objects.all(),
        source='geartype',
        write_only=True
    )

    class Meta:
        model = Car_Detail_Model
        fields = "__all__"
        # extra_kwargs = {
        #     'owner': {'read_only': True}
        # }
        
class Car_Buyserializers(serializers.ModelSerializer):
    class Meta:
        model = Car_Buy_Model
        fields = "__all__"
        extra_kwargs = {'buyer' : {'read_only':True}}

class ChatbotCarserializers(serializers.ModelSerializer):
    class Meta:
        model = Car_Detail_Model
        fields = ['brand', 'model', 'colour', 'year', 'price', 'fueltype', 'geartype', 'carlocation']
