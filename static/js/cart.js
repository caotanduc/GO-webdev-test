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
		let data = { 
			'id' : $(this).data('itemid') ,
		};

		$.ajax({
			url: url,
			type: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			data: JSON.stringify(data),
			dataType: 'json',
			success: function(data) {

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
				
			}
		})
	})	
})