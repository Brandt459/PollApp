# Generated by Django 2.2 on 2021-01-24 04:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210123_2327'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='poll',
            name='option1votes',
        ),
    ]
