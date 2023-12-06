//retrieves array from local storage of cart
let userCart = JSON.parse(localStorage.getItem('myCart')) || [];

//accesses html div with the id cart-item
const cart = document.querySelector('#checkout-item')
console.log(userCart);

//shows everything in array
for (i = 0; i < userCart.length; i++) {
    cart.innerHTML += `<p>Title: ${userCart[i].title},<br> Price: ${userCart[i].price} </p>"`;
}