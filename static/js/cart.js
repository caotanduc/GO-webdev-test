function updateCookieItem(item_id, action) {
	if (action === 'add') {
		if (cart[item_id] == undefined) {
			cart[item_id] = { 'quantity' : 1 }
			$('#shop-button' + item_id).html('<img src="' + check_mark + '" style="width: 16px;" alt="Check Mark"/>')
		}
		else {
			return
		}
	}
	else if (action === '+') {
		cart[item_id]['quantity'] += 1
	}
	else if (action === '-') {
		cart[item_id]['quantity'] -= 1
		if (cart[item_id]['quantity'] <= 0) {
			delete cart[item_id]
			if (Object.keys(cart).length == 0) {
				$('#cart .card-body').append('<div class="card-empty"><p class="card-empty-text">Your cart is empty.</p></div>')
			}
		}
	}
	else if (action == 'del') {
		delete cart[item_id]	
		$('#div' + item_id).remove()

		$('#shop' + item_id + ' .shop-item-button').html('<p>ADD TO CART</p>')
		if (Object.keys(cart).length == 0) {
			$('#cart .card-body').append('<div class="card-empty"><p class="card-empty-text">Your cart is empty.</p></div>')
		}
	}

	document.cookie = 'cart=' + JSON.stringify(cart) + ';domain=;path=/'
	location.reload()
}

$(document).ready(function() {
	$('.shop-item-button').on('click', function(event) {
		let item_id = $(this).data('itemid')

		if (user == 'AnonymousUser') {
			updateCookieItem(item_id, 'add')
		}

		else {
			event.preventDefault();
			let url = '/add_to_cart'
	
			$.ajax({
				url: url,
				type: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				data: JSON.stringify({
					'id' : item_id,
				}),
				dataType: 'json',
				success: function(data) {
					if (Object.keys(data).length !== 0) {
						$('.card-title-amount').html('$' + data['total_price'])
						$('.card-empty').css('display', 'none')	
	
						$('#cart .card-body').append('<div id="div'+data['id']+'" class="cart-item"> <div class="cart-item-left"> <div class="cart-item-image" style="background-color: '+data['color']+';"> <div class="cart-item-block"> <img src="'+data['image']+'" alt="'+data['name']+'"> </div> </div> </div> <div class="cart-item-right"> <div class="cart-item-name">'+data['name']+'</div> <div class="cart-item-price">$'+data['price']+'</div> <div class="cart-item-action"> <div class="cart-item-count"> <div data-itemid="'+data['id']+'" class="cart-item-count-button">-</div> <div data-itemid="'+data['id']+'" class="cart-item-count-number">'+data['quantity']+'</div> <div data-itemid="'+data['id']+'" class="cart-item-count-button">+</div> </div> <div data-itemid="'+data['id']+'" class="cart-item-remove"> <img src="'+trash_can+'"> </div> </div> </div> </div>');
						
	
						$(event.target).html('<img src="' + check_mark + '" style="width: 16px;" alt="Check Mark"/>')
					}
				}
			})
		}
	})
})


$(document).ready(function() {
	$('#cart .card-body').on('click', function(event) {

		event.preventDefault()

		const target = event.target
		const action = target.outerText

		let itemId = target.getAttribute('data-itemid')


		// + , - and "" for delete
		if (action == '+' || action == '-') {
			let url = '/update_cart_item'
			let diff = 1

			if (user == 'AnonymousUser') {
				updateCookieItem(itemId, action)
			}
			else {
				if (action == '-') {
					diff = -1
				}
	
				$.ajax({
					type: 'POST',
					url: url,
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrftoken,		
					},
					data: JSON.stringify({
						'id': itemId,
						'diff': diff,
					}),
					dataType: 'json',
					success: function(data) {
						if (data['delete'] === true) {
							$('#div' + itemId).remove()
							$('.card-title-amount').html('$' + data['total_price'])
	
							$('#shop' + itemId + ' .shop-item-button').text('ADD TO CART')
	
							if (data['total_price'] == 0.0) {
								$('.card-empty').css('display', 'block')
							}	
						}
						else {
							$('#div' + itemId + ' .cart-item-count-number').html(data['quantity'])
							$('#div' + itemId + ' .cart-item-price').html('$' + data['price'])
							$('.card-title-amount').html('$' + data['total_price'])
						}
					}
				})
			}
	
		}
		else if (action == '') {
			if (itemId === null) {
				itemId = target.parentElement.getAttribute('data-itemid')
			}

			if (user == 'AnonymousUser') {
				updateCookieItem(itemId, 'del')
			}
			else {
				let url = '/remove_cart_item'
				
				$.ajax({
					type: 'POST',
					url: url,
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrftoken,		
					},
					data: JSON.stringify({
						'id': itemId,
					}),
					dataType: 'json',
					success: function(data) {
						$('.card-title-amount').html('$' + data['total_price'])
	
						$('#div' + itemId).remove()
	
						$('#shop' + itemId + ' .shop-item-button').html('<p>ADD TO CART</p>')
		
						if (data['total_price'] == 0.0) {
							$('#cart .card-body').append('<div class="card-empty"><p class="card-empty-text">Your cart is empty.</p></div>')
						}
					}
				})	
			}
		}
	})
})