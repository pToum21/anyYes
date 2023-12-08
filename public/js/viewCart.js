//renders user's cart; this has to be separate from addToCart,
//because the cart.hbs page does not have an addToCart button,
//which throws an error to console because of the addToCart event listener

//retrieves array from local storage of cart
let userCart = JSON.parse(localStorage.getItem('myCart')) || [];

//accesses html div with the id cart-item
const cart = document.querySelector('#cart-listing')

//shows everything in array
for (i = 0; i < userCart.length; i++) {
    let category = userCart[i].category_id;
    if (category === 1) {
        category = 'console';
    } else {
        category = 'game'
    }

    cart.innerHTML += `
    <section class="is-multiline columns is-centered p-3">
    <div class="column my-2 p-5 is-one-fifth antique crsl-img "
    style="line-height: 1.5; min-width: 200px; min-height: 200px; border: 5px double antiquewhite;">

    <a href="/category/${category}/${userCart[i].id}">
    <strong>
        <p class="my-2">${userCart[i].title}}</p>
    </strong>
    </a>
    <p class="my-2">${userCart[i].price}</p>
    <img id="listingImage" src="data:image/jpeg;base64,${userCart[i].image}" class="image is-128x128 my-2" style=" display: block; margin: auto;" />
    <button class="button has-background-primary"><a href="/checkout?name=${userCart[i].title}" class="checkout-btn" style="color:black !important; font-family: arial">Checkout</a></button>
    </div>
    </section>
    `;
}

document.querySelector('.checkout-btn').addEventListener('click', (event) => { });


//   <a href="/category/{{category.category_name}}/{{id}}">
//     <strong>
//       <p class="my-2">{{title}}</p>
//     </strong>
//   </a>
//   <p class="my-2">{{price}}</p>
//   <p class="my-2">{{condition}} {{category.category_name}}</p>
//   <div class="image is-128x128  my-2" style=" display: block; margin: auto;">
//     <img id="listingImage" src="data:image/png;base64,{{image}}" />
//   </div>
//   <div>
//     <button class="delete-btn button is-danger is-small" data-id="{{id}}">Delete</button>
//   </div>
