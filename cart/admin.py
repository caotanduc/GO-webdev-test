from django.contrib import admin
from .models import ShopItem, Cart, CartItem
# Register your models here.

admin.site.register([ShopItem, Cart, CartItem])