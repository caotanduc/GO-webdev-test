from django.shortcuts import render, redirect
from .models import ShopItem, Cart, CartItem
from django.http import JsonResponse
import json
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.
@ensure_csrf_cookie
def index(request):
	shop_items = ShopItem.objects.all()

	cart = None
	cart_items = []
	cart_cookie = {}
	items = []

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_items = cart.cart_items.all()
	else:
		try:
			cart_cookie = json.loads(request.COOKIES['cart'])
			items = [int(key) for key in cart_cookie.keys()]
		except:
			cart_cookie = {}

		total_price = 0.0
		for item_id in cart_cookie:
			shoe = ShopItem.objects.get(id=item_id)

			price = shoe.price * cart_cookie[item_id]['quantity']
			total_price += price
			cart_item = {
				'shop_item': {
					'id': int(shoe.id),
					'color': shoe.color,
					'image': shoe.image,
					'name': shoe.name,
					'price': shoe.price,
				},
				'quantity': cart_cookie[item_id]['quantity'],
				'price': price
			}

			cart_items.append(cart_item)

		cart = {
			'total_price': total_price
		}
			

	context = {'shop_items': shop_items, 'cart': cart, 'cart_items':cart_items, 'cart_cookie': cart_cookie, 'ids': items}
	return render(request, 'cart/index.html', context)

@ensure_csrf_cookie
def add_to_cart(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])

	update_data = { }

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		update_data = {}	

		if cart_item.quantity == 0:
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



@ensure_csrf_cookie
def update_cart_item(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])
	diff = int(data['diff'])

	update_data = {
		'delete': False,
		'price': 0,
	}

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		cart_item.quantity += diff
		cart_item.save()

		if cart_item.quantity <= 0:
			cart_item.quantity = 0
			update_data['total_price'] = cart.total_price

			update_data['delete'] = True

			cart_item.delete()
			return JsonResponse(update_data, safe=False)



	update_data['quantity'] = cart_item.quantity,
	update_data['price'] = cart_item.price,
	update_data['total_price'] = cart.total_price,

	return JsonResponse(update_data, safe=False)

@ensure_csrf_cookie
def remove_cart_item(request):
	data = json.loads(request.body)

	item_id = ShopItem.objects.get(id=data['id'])

	if request.user.is_authenticated:
		cart, created = Cart.objects.get_or_create(user=request.user)
		cart_item, created = CartItem.objects.get_or_create(cart=cart, shop_item=item_id)
		cart_item.quantity=0
		cart_item.delete()

	return JsonResponse({ 'total_price' : cart.total_price }, safe=False)
