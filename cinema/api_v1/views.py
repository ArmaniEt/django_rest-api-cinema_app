from webapp.models import Movie, Hall, Show, Seat, Category
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, HallSerializer, \
    ShowSerializer, SeatSerializer, CategorySerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer


class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer


class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by('-begin_show_time')
    serializer_class = ShowSerializer


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by('-hall')
    serializer_class = SeatSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
