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


const updateBtns = document.getElementsByClassName('shop-item-button')

for (let i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', () => {
		let url = '/add_to_cart'

		let data = { 'id' : updateBtns[i].dataset.itemid }

		fetch (url, {
			method: 'POST',
			headers: {"Content-Type":"application/json", 'X-CSRFToken': csrftoken},
			body: JSON.stringify(data)	
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		})
		.catch(error => { console.error(error) })
	})
}

// $(document).ready(function() {
// 	$('.shop-item-button').on('click', function(event) {
// 		event.preventDefault();
// 		let url = '/add_to_cart'
// 		let data = { 'id' : $(this).data('itemid') };

// 		$.ajax({
// 			url: url,
// 			type: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'X-CSRFToken': csrftoken,
// 			},
// 			data: JSON.stringify(data),
// 			dataType: 'json',
// 			success: function(data) {
// 				$(this).val(data)
// 			}
// 		})
// 	})
// })

