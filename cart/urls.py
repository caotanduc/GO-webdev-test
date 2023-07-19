from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('add_to_cart', views.add_to_cart, name='add'),
	path('update_cart_item', views.update_cart_item, name='update_cart'),
	path('remove_cart_item', views.remove_cart_item, name='remove_cart_item')
]