from webapp.models import Movie, Hall, Show, Seat, Category, Booking, Discount, Tickets
from rest_framework import viewsets
from api_v1.serializers import MovieCreateSerializer, MovieDisplaySerializer, HallSerializer, \
    ShowSerializer, SeatSerializer, CategorySerializer, BookingSerializer, DiscountSerializer, TicketsSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.active().order_by('-release_date')
    serializer_class = MovieCreateSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer


class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by('-begin_show_time')
    serializer_class = ShowSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by('-hall')
    serializer_class = SeatSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Tickets.objects.all()
    serializer_class = TicketsSerializer
