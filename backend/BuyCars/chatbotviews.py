from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


from .models import Car_Detail_Model
from .serializers import Car_Detailserializers, ChatbotCarserializers


class CarChatbotView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        brand = request.data.get("brand")
        model = request.data.get("model")
        colour = request.data.get("colour")
        min_price = request.data.get("min_price")
        max_price = request.data.get("max_price")
        fueltype = request.data.get("fueltype")
        geartype = request.data.get("geartype")
        location = request.data.get("location")
        min_year = request.data.get("min_year")
        max_year = request.data.get("max_year")
        print("Request Data:", request.data.get("fueltype"))  # Debugging line to print the request data
        print("Request Data:", type(request.data.get("fueltype")))  # Debugging line to print the request data

        cars = Car_Detail_Model.objects.all()

        if brand:
            cars = cars.filter(
                brand__iexact=brand
            )

        if model:
            cars = cars.filter(
                model__icontains=model
            )

        if colour:
            cars = cars.filter(
                colour__iexact=colour
            )

        if min_price:
            cars = cars.filter(
                price__gte=min_price
            )

        if max_price:
            cars = cars.filter(
                price__lte=max_price
            )

        if fueltype:
            cars = cars.filter(
                fueltype__fueltype__iexact=fueltype
            )

        if geartype:
            cars = cars.filter(
                geartype__geartype__iexact=geartype
            )

        if location:
            cars = cars.filter(
                carlocation__icontains=location
            )

        if min_year:
            cars = cars.filter(
                year__gte=min_year
            )

        if max_year:
            cars = cars.filter(
                year__lte=max_year
            )

        serializer = Car_Detailserializers(
            cars,
            many=True
        )

        return Response({
            "count": cars.count(),
            "cars": serializer.data
        })