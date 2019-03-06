from webapp.models import Movie, Hall, Seat, Show, Category
from rest_framework import serializers


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')

    class Meta:
        model = Show
        fields = ('id', 'url',  'begin_show_time', 'finish_show_time', 'ticket_price', 'movie', 'hall', 'is_deleted')


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'url')


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')

    class Meta:
        model = Seat
        fields = ('id', 'url', 'row', 'seat', 'hall')


class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')

    class Meta:
        model = Hall
        fields = ('id', 'url',  'name')


class MovieSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')

    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category', 'is_deleted', 'url')
