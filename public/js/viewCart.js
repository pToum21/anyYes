//renders user's cart; this has to be separate from addToCart,
//because the cart.hbs page does not have an addToCart button,
//which throws an error to console because of the addToCart event listener

//retrieves array from local storage of cart
let userCart = JSON.parse(localStorage.getItem('myCart')) || [];

//accesses html div with the id cart-item
const cart = document.querySelector('#cart-item')

//shows everything in array
for (i = 0; i < userCart.length; i++) {
    cart.innerHTML += `<p>${userCart[i].title}, ${userCart[i].description}, ${userCart[i].price}</p>
    <img src="data:image/jpeg;base64,${userCart[i].image}" />
    <a  href="/checkout?name=${userCart[i].title}" class="checkout-btn">Checkout</a>
    `;
}

// const checkOut = async () => {
//     document.location.replace('/checkout')
// }

// document.querySelector('#checkout').addEventListener('click', checkOut)

document.querySelector('.checkout-btn').addEventListener('click', (event) => {
    // event.preventDefault();

});
