from webapp.models import Movie, Hall, Seat, Show, Category
from rest_framework import serializers


class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ('id', 'begin_show_time', 'finish_show_time', 'ticket_price', 'movie', 'hall')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'row', 'seat', 'hall')


class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = ('id', 'name')


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date')
