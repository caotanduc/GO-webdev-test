from django.shortcuts import render
from .models import ShopItem

# Create your views here.
def index(request):
	shoes = ShopItem.objects.all()
	context = {'shoes': shoes}
	return render(request, 'cart/index.html', context)