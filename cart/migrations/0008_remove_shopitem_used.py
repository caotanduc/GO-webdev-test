# Generated by Django 4.2.3 on 2023-07-21 02:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0007_remove_cart_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shopitem',
            name='used',
        ),
    ]
