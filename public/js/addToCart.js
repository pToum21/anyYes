//custom function to prevent duplicate items being added to array
// credit this function to xpert ai in readme
const isDuplicate = (title, cart) => {
    const lowerCaseTitle = title.toLowerCase();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title.toLowerCase() === lowerCaseTitle) {
            return true;
        }
    }
    return false;
};
//function to add listing item to cart
const addToCart = () => {
    try {
        const id = window.location.pathname.split('/').pop();
        console.log(id);

        fetch(`/api/listings/${id}`, {
            method: 'GET'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.listing.title);
                let userCart = JSON.parse(localStorage.getItem('myCart')) || [];

                //prevent duplicates in local storage
                if (!isDuplicate(data.listing.title, userCart)) {
                    userCart.push(data.listing);
                    localStorage.setItem('myCart', JSON.stringify(userCart));
                }
            })

    } catch (error) {
        console.error(error.message);
    }
};
// event listener for add to cart button
document.querySelector('.cart-btn').addEventListener('click', addToCart);

