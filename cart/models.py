from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.

class ShopItem(models.Model):
	image = models.URLField(max_length=200)
	name = models.CharField(max_length=200)
	description = models.TextField()
	price = models.DecimalField(max_digits=8, decimal_places=2)
	color = models.CharField(max_length=7)

	used = models.BooleanField(default=False)

	def __str__(self):
		return self.name


class Cart(models.Model):
	id = models.UUIDField(default=uuid.uuid4, primary_key=True)
	user = User.objects.get_or_create(username='whatever')[0]

	def __str__(self):
		return str(self.id)

	@property
	def total_price(self):
		return format(sum([item.price for item in self.cart_items.all()]), '.2f')

class CartItem(models.Model):
	shop_item = models.ForeignKey(ShopItem, on_delete=models.CASCADE, related_name='shop_item')
	cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
	quantity = models.IntegerField(default=0)

	def __str__(self):
		return self.shop_item.name

	@property
	def price(self):
		return self.shop_item.price * self.quantity