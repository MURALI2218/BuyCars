from django.urls import path, include
from .views import CreateUserView, CreateCarforsale, cardelete, carorder,UpdateCarView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('createuser/',CreateUserView.as_view(), name= 'registeruser'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('carlists/', CreateCarforsale.as_view(), name= 'newcar'),
    path('deletecar/<int:pk>/', cardelete.as_view(), name= 'deletecar'),
    path("bookcar/",carorder.as_view(), name="bookcar"),
    path("updatecardetails/<int:pk>/", UpdateCarView.as_view(), name="updatecar")
]