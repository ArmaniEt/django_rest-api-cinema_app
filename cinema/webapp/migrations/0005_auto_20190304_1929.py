# Generated by Django 2.1.7 on 2019-03-04 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0004_show_is_deleted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='show',
            name='movie',
        ),
        migrations.AddField(
            model_name='show',
            name='movie',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='show_movie', to='webapp.Movie'),
            preserve_default=False,
        ),
    ]
