const cart = JSON.parse(localStorage.getItem('myCart'))
const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const listingId = parseInt(params.get('listing_id'))
const filteredCart = cart.filter(item => item.id !== listingId);


localStorage.setItem('myCart', JSON.stringify(filteredCart))
