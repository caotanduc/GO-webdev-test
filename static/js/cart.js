function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


$(document).ready(function() {
	$('.shop-item-button').on('click', function(event) {
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
				'id' : $(this).data('itemid'),
			}),
			dataType: 'json',
			success: function(data) {
				if (Object.keys(data).length !== 0) {
					$('.card-title-amount').html('$' + data['total_price'])
					$('.card-empty').css('display', 'none')	

					$('#cart .card-body').append('<div id="div'+data['id']+'" class="cart-item"> <div class="cart-item-left"> <div class="cart-item-image" style="background-color: '+data['color']+';"> <div class="cart-item-block"> <img src="'+data['image']+'" alt="'+data['name']+'"> </div> </div> </div> <div class="cart-item-right"> <div class="cart-item-name">'+data['name']+'</div> <div class="cart-item-price">$'+data['price']+'</div> <div class="cart-item-action"> <div class="cart-item-count"> <div data-itemid="'+data['id']+'" class="cart-item-count-button">-</div> <div data-itemid="'+data['id']+'" class="cart-item-count-number">'+data['quantity']+'</div> <div data-itemid="'+data['id']+'" class="cart-item-count-button">+</div> </div> <div data-itemid="'+data['id']+'" class="cart-item-remove"> <img src="'+trash_can+'"> </div> </div> </div> </div>');
					
				}
				else {

				}
			}
		})
	})

	$('.cart-item-count-button').on('click', function(event) {
		event.preventDefault()
		let url = '/update_cart_item'
		let diff = 1
		const itemId = $(this).data('itemid')

		if ($(this).html() === '-') 
			diff = -1

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
					$('#div' + itemId).css({ 'display' : 'none' , 'padding' : '0px'})
					$('.card-title-amount').html('$' + data['total_price'])

					if (data['total_price'] == 0.0) {
						$('#cart .card-body').html('')
						$('#cart .card-body').append('<div class="card-empty"><p class="card-empty-text">Your cart is empty.</p></div>')
					}	
				}
				else {
					$('#div' + itemId + ' .cart-item-count-number').html(data['quantity'])
					$('#div' + itemId + ' .cart-item-price').html('$' + data['price'])
					$('.card-title-amount').html('$' + data['total_price'])
				}
			}
		})
	})

	$('.cart-item-remove').on('click', function(event) {
		event.preventDefault()
		let url = '/remove_cart_item'
		const itemId = $(this).data('itemid')

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
				$('#div' + itemId).css({ 'display' : 'none' , 'padding' : '0px'})

				if (data['total_price'] === 0.0) {
					$('#cart .card-body').append('<div class="card-empty"><p class="card-empty-text">Your cart is empty.</p></div>')
				}
			}
		})
	})	
})