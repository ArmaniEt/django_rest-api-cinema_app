from webapp.models import Movie, Hall, Seat, Show, Category, Booking, Discount, Tickets
from rest_framework import serializers


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')

    movie_url = serializers.HyperlinkedRelatedField(
        view_name='api_v1:movie-detail',
        read_only=True,
        source='movie'
    )

    hall_url = serializers.HyperlinkedRelatedField(
        view_name='api_v1:hall-detail',
        read_only=True,
        source='hall'
    )

    class Meta:
        model = Show
        fields = ('id', 'url', 'movie_url', 'hall_url', 'begin_show_time', 'finish_show_time',
                  'ticket_price', 'movie', 'hall', 'is_deleted')


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'url')


# For displaying id and name of the genre of movie in Movie serializer
class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')

    class Meta:
        model = Seat
        fields = ('id', 'url', 'row', 'seat', 'hall')


# Serializer for displaying seats in Hall serializer
class InlineSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'row', 'seat')


class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')
    seat = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ('id', 'url',  'name', 'seat')


class MovieCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')

    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category', 'is_deleted', 'url')


class MovieDisplaySerializer(MovieCreateSerializer):
    category = InlineCategorySerializer(many=True, read_only=True)


class BookingSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:booking-detail')
    seats = InlineSeatSerializer(many=True, read_only=True)
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', read_only=True, source='show')

    class Meta:
        model = Booking
        fields = ('id', 'url', 'unique_code', 'created_date', 'updated_date', 'show', 'seats', 'status', 'show_url')


class DiscountSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:discount-detail')

    class Meta:
        model = Discount
        fields = ('name', 'url', 'discount', 'disc_started', 'disc_finished')


class TicketsSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:tickets-detail')
    seat = InlineSeatSerializer()
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', read_only=True, source='show')

    class Meta:
        model = Tickets
        fields = ('show', 'url', 'show_url', 'seat', 'ticket_discount', 'returned')
