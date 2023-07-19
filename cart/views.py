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

	context = {'shop_items': shop_items, 'cart': cart, 'cart_items':cart_items}
	return render(request, 'cart/index.html', context)

def add_to_cart(request):
	data = json.loads(request.body)

	shoe = ShopItem.objects.get(id=data['id'])

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=shoe)
		if cart_item.quantity == 0:
			cart_item.quantity = 1
		cart_item.save()

	return JsonResponse({}, safe=False)

def update_cart_item(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])
	diff = int(data['diff'])

	update_data = {
		'delete': False
	}

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		cart_item.quantity += diff
		if cart_item.quantity <= 0:
			update_data['delete'] = True
			cart_item.delete()
			return JsonResponse(update_data, safe=False)

		cart_item.save()

	update_data['quantity'] = cart_item.quantity,
	update_data['price'] = cart_item.price,
	update_data['total_price'] = cart.total_price,

	return JsonResponse(update_data, safe=False)


def remove_cart_item(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		cart_item.delete()

	return JsonResponse({}, safe=False)
