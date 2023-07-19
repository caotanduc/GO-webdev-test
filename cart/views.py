from django.shortcuts import render, redirect
from .models import ShopItem, Cart, CartItem
from django.http import JsonResponse
import json
from django.contrib import messages

# Create your views here.
def index(request):
	shop_items = ShopItem.objects.all()

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_items = cart.cart_items.all()

	context = {'shop_items': shop_items, 'cart': cart, 'cart_items': cart_items}
	return render(request, 'cart/index.html', context)

def add_to_cart(request):
	data = json.loads(request.body)

	shoe = ShopItem.objects.get(id=data['id'])

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=shoe)
		cart_item.quantity += 1
		cart_item.save()

	return JsonResponse(cart_item.id, safe=False)
