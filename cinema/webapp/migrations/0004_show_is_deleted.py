# Generated by Django 2.1.7 on 2019-03-03 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_movie_is_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='show',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
