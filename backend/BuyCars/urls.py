from django.urls import path, include
from .views import CreateUserView, CreateCarforsale, carorder,UpdateCarView,UsersSalescar,Userssalescarpage,carorderdelete, GearTypeView, FuelTypeView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .chatbotviews import CarChatbotView

urlpatterns = [
    path('createuser/',CreateUserView.as_view(), name= 'registeruser'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('carlists/', CreateCarforsale.as_view(), name= 'newcar'),
    path("bookcar/",carorder.as_view(), name="bookcar"),
    path("updatecardetails/<int:pk>/", UpdateCarView.as_view(), name="updatecar"),
    path("edituser_salescars/<int:pk>/", UsersSalescar.as_view(), name='usersalescars' ),
    path("carsforsale/", Userssalescarpage.as_view(), name='usersalescars' ),
    path("deletebuyorder/<int:pk>/",carorderdelete.as_view(), name = "deletebuyorder" ),
    path("fueltypes/", FuelTypeView.as_view(), name="fueltypes"),
    path("geartypes/", GearTypeView.as_view(), name="geartypes"),

    path( "chatbot/", CarChatbotView.as_view(), name="car-chatbot"),
]
