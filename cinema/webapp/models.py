from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
    category = models.ManyToManyField(Category, related_name='movie')

    def __str__(self):
        return self.name


class Hall(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Seat(models.Model):
    row = models.IntegerField(null=True, blank=True)
    seat = models.IntegerField(null=True, blank=True)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name='seat')


class Show(models.Model):
    begin_show_time = models.DateTimeField()
    finish_show_time = models.DateTimeField()
    ticket_price = models.DecimalField(max_digits=6, decimal_places=2)
    movie = models.ManyToManyField(Movie, related_name='show')
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name='show_hall')

    def __str__(self):
        return 'Begin date is: {0}, Ticket price: {1:.2f}'.format(self.begin_show_time, float(self.ticket_price))
