from django.db import models

# Create your models here.
class ShopItem(models.Model):
	image = models.URLField(max_length=200)
	name = models.CharField(max_length=200)
	description = models.TextField()
	price = models.DecimalField(max_digits=8, decimal_places=2)
	color = models.CharField(max_length=7)

	def __str__(self):
		return self.name