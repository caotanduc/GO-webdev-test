from django.shortcuts import render, redirect
from .models import ShopItem, Cart, CartItem
from django.http import JsonResponse
import json

# Create your views here.
def index(request):
	shop_items = ShopItem.objects.all()

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create()
		cart_items = cart.cart_items.all()

	context = {'shop_items': shop_items, 'cart': cart, 'cart_items':cart_items}
	return render(request, 'cart/index.html', context)

def add_to_cart(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])


	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create()
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		update_data = {}	

		if cart_item.quantity == 0:
			ShopItem.objects.filter(pk=item_id.pk).update(used=True)
			cart_item.quantity = 1
			cart_item.save()

			update_data['id'] = item_id.id,
			update_data['image'] = item_id.image,
			update_data['name'] = item_id.name,
			update_data['description'] = item_id.description,
			update_data['price'] = item_id.price,
			update_data['color'] = item_id.color,
			update_data['quantity'] = cart_item.quantity,
			update_data['total_price'] = cart.total_price,

	return JsonResponse(update_data, safe=False)



def update_cart_item(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])
	diff = int(data['diff'])

	update_data = {
		'delete': False,
		'price': 0,
	}

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create()
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		cart_item.quantity += diff
		cart_item.save()

		if cart_item.quantity <= 0:
			cart_item.quantity = 0
			ShopItem.objects.filter(pk=item_id.pk).update(used=False)
			update_data['total_price'] = cart.total_price

			update_data['delete'] = True

			cart_item.delete()
			return JsonResponse(update_data, safe=False)



	update_data['quantity'] = cart_item.quantity,
	update_data['price'] = cart_item.price,
	update_data['total_price'] = cart.total_price,

	return JsonResponse(update_data, safe=False)


def remove_cart_item(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create()
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		cart_item.quantity=0
		ShopItem.objects.filter(pk=item_id.pk).update(used=False)
		cart_item.delete()

	return JsonResponse({ 'total_price' : cart.total_price }, safe=False)
