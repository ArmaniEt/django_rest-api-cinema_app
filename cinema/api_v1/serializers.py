from webapp.models import Movie, Hall, Seat, Show, Category
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
        fields = ('id', 'url', 'movie_url', 'hall_url', 'begin_show_time', 'finish_show_time', 'ticket_price', 'movie', 'hall', 'is_deleted')


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


class MovieSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')
    category = InlineCategorySerializer(many=True)

    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category', 'is_deleted', 'url')
