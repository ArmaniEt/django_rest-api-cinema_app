from django.contrib import admin
from webapp.models import Movie, Show, Hall, Category, Seat


class MovieAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'release_date']
    filter_horizontal = ['category']
    ordering = ['-release_date']
    search_fields = ['name', 'id']


admin.site.register(Movie, MovieAdmin)


class ShowAdmin(admin.ModelAdmin):
    fields = ['begin_show_time', 'finish_show_time', 'ticket_price', 'movie', 'hall']
    ordering = ['-begin_show_time']


admin.site.register(Show, ShowAdmin)
admin.site.register(Hall)
admin.site.register(Category)
admin.site.register(Seat)
