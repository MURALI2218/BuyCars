from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerialiers, Car_Detailserializers,Cars_statusserializers,Car_Buyserializers, carfueltypeserializers, cargeartypeserializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics,viewsets,views,mixins
from .models import Car_Detail_Model,Car_Buy_Model,Car_Status_Model, carfueltype_model, cargeartype_model

from django_filters.rest_framework import DjangoFilterBackend
from .filters import CarFilter
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset =  User.objects.all()
    serializer_class = UserSerialiers
    permission_classes = [AllowAny]

class GearTypeView(generics.ListAPIView):
    serializer_class = cargeartypeserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return cargeartype_model.objects.all()

class FuelTypeView(generics.ListAPIView):
    serializer_class = carfueltypeserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return carfueltype_model.objects.all()

class CreateCarforsale(generics.ListCreateAPIView):
    serializer_class = Car_Detailserializers
    permission_classes = [AllowAny]
    queryset = Car_Detail_Model.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = CarFilter
        
    def perform_create(self, serializer):
        print(serializer)
        if serializer.is_valid():
            serializer.save(owner = self.request.user)

        else:print(serializer.errors)
    

class UpdateCarView(generics.RetrieveUpdateAPIView):
    serializer_class = Car_Detailserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # user = self.request.user
       
        return Car_Detail_Model.objects.all()
        
    def perform_update(self, serializer):
        if serializer.is_valid():
            return serializer.save(owner = self.request.user)
            
        else:print(serializer.errors)

# class cardelete(generics.DestroyAPIView):

#     serializer_class = Car_Detailserializers
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Car_Detail_Model.objects.all()


class UsersSalescar(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Car_Detailserializers
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        return Car_Detail_Model.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner =  self.request.user)


class Userssalescarpage(generics.ListAPIView):
    serializer_class  = Car_Detailserializers
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        return Car_Detail_Model.objects.filter(owner_id = self.request.user.id)


class carorder(generics.ListCreateAPIView):
    serializer_class = Car_Buyserializers
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        return Car_Buy_Model.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            
            serializer.save(buyer =  self.request.user)
        
        else:print(serializer.errors)

class carorderdelete(viewsets.generics.DestroyAPIView):
    serializer_class = Car_Buyserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Car_Buy_Model.objects.all()

    
