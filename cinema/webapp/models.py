from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return self.name


class SoftDeleteMovieManager(models.Manager):
    def active(self):
        return self.filter(is_deleted=False)

    def deleted(self):
        return self.filter(is_deleted=True)


class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
    category = models.ManyToManyField(Category, related_name='movie')
    is_deleted = models.BooleanField(default=False)

    objects = SoftDeleteMovieManager()

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

    def __str__(self):
        return 'Your seat: {0}, Your row: {1} Hall is : {2}'.format(self.seat, self.row, self.hall.name)


class SoftDeleteShowManager(models.Manager):
    def active(self):
        return self.filter(is_deleted=False)


class Show(models.Model):
    begin_show_time = models.DateTimeField()
    finish_show_time = models.DateTimeField()
    ticket_price = models.DecimalField(max_digits=6, decimal_places=2)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='show_movie')
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name='show_hall')
    is_deleted = models.BooleanField(default=False)

    objects = SoftDeleteShowManager()

    def __str__(self):
        return '{0} Begin date is: {1}, Ticket price: {2:.2f}'\
            .format(self.movie, self.begin_show_time, float(self.ticket_price))
