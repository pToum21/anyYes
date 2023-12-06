const cart = JSON.parse(localStorage.getItem('myCart'))
console.log(cart)
const url = new URL(window.location.href)

const params = new URLSearchParams(url.search)


const listingId = parseInt(params.get('listing_id'))
console.log(listingId)
console.log(typeof listingId)
const filteredCart = cart.filter(item => item.id !== listingId);
console.log(filteredCart)

localStorage.setItem('myCart', JSON.stringify(filteredCart))
