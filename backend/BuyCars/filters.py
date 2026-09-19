# filters.py

import django_filters
from .models import Car_Detail_Model


class CarFilter(django_filters.FilterSet):

    model = django_filters.CharFilter(
        field_name='model',
        lookup_expr='icontains'
    )

    colour = django_filters.CharFilter(
        field_name='colour',
        lookup_expr='icontains'
    )

    carlocation = django_filters.CharFilter(
        field_name='carlocation',
        lookup_expr='icontains'
    )

    class Meta:
        model = Car_Detail_Model
        fields = [
            'model',
            'colour',
            'fueltype',
            'geartype',
            'carlocation',
            'year',
        ]