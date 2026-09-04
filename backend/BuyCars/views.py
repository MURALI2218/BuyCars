from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerialiers, Car_Detailserializers,Cars_statusserializers,Car_Buyserializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from .models import Car_Detail_Model,Car_Buy_Model,Car_Status_Model
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset =  User.objects.all()
    serializer_class = UserSerialiers
    permission_classes = [AllowAny]

class CreateCarforsale(generics.ListCreateAPIView):
    serializer_class = Car_Detailserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # user = self.request.user
       
        return Car_Detail_Model.objects.all()
        
    def perform_create(self, serializer):
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

class cardelete(generics.DestroyAPIView):

    serializer_class = Car_Detailserializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Car_Detail_Model.objects.all()


class carorder(generics.ListCreateAPIView):
    serializer_class = Car_Buyserializers
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        return Car_Buy_Model.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            
            serializer.save(buyer =  self.request.user)
        
        else:print(serializer.errors)