from rest_framework.exceptions import ValidationError
from webapp.models import Movie, Hall, Seat, Show, Category, Booking, Discount, Tickets
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


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

    hall_name = serializers.SerializerMethodField(read_only=True, source='hall')
    movie_name = serializers.SerializerMethodField(read_only=True, source='movie')

    def get_movie_name(self, show):
        return show.movie.name

    def get_hall_name(self, show):
        return show.hall.name

    class Meta:
        model = Show
        fields = ('id', 'url', 'movie_url', 'hall_url', 'begin_show_time', 'finish_show_time',
                  'ticket_price', 'movie', 'hall', 'is_deleted', 'hall_name', 'movie_name')


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
        fields = ('id', 'name', 'description', 'poster', 'release_date',
                  'finish_date', 'categories', 'is_deleted', 'url')


class MovieDisplaySerializer(MovieCreateSerializer):
    categories = InlineCategorySerializer(many=True, read_only=True)


# For creating booking and for displaying same as Movie serializers
class BookingCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:booking-detail')
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', read_only=True, source='show')

    class Meta:
        model = Booking
        fields = ('id', 'url', 'unique_code', 'created_date', 'updated_date', 'show', 'seats', 'status', 'show_url')


class BookingDisplaySerializer(BookingCreateSerializer):
    seats = InlineSeatSerializer(many=True, read_only=True)
#


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


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if validated_data.get('password'):
            password = validated_data.pop('password')
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')


class AuthTokenSerializer(serializers.Serializer):
    token = serializers.CharField(write_only=True)

    def validate_token(self, token):
        try:
            return Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise ValidationError("Invalid credentials")


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise ValidationError('Passwords do not match')
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.is_active = True # you should activate this via email if value is False
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'password_confirm', 'email', 'first_name', 'last_name']

