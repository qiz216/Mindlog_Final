# Generated by Django 3.0.5 on 2020-09-14 00:53

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200628_1823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None, unique=True),
        ),
    ]
