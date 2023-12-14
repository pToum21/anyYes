//IF WE DECIDE TO MAKE KEY SESSION USER_ID

//custom function to prevent duplicate items being added to array
// Define the isDuplicate function

const buttons = document.querySelectorAll('.cart-btn')

const isDuplicate = (title, cart) => {
    const lowerCaseTitle = title.toLowerCase();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title.toLowerCase() === lowerCaseTitle) {
            return true;
        }
    }
    return false;
};

// Define the addToCart function
const addToCart = () => {
    try {
        const id = window.location.pathname.split('/').pop();

        fetch(`/api/listings/${id}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.listing.currentUser)
                const currentUser = data.listing.currentUser;
                const userCart = JSON.parse(localStorage.getItem(currentUser.toString())) || [];

                // Prevent duplicates in local storage
                if (!isDuplicate(data.listing.title, userCart)) {
                    userCart.push(data.listing);
                    localStorage.setItem(currentUser.toString(), JSON.stringify(userCart));

                    // Check if the item is sold
                    if (data.listing.sold) {
                        // If sold, remove from both local storage and database
                        removeFromCartAndDatabase(data.listing.id);
                    } else {
                        // Redirect to the checkout page
                        window.location.href = '/cart'; // Replace '/checkout' with the actual path to your checkout page
                    }
                }
            });
    } catch (error) {
        console.error(error.message);
    }
};

// Define the removeFromCartAndDatabase function
const removeFromCartAndDatabase = async (id) => {
    try {

        const userCart = JSON.parse(localStorage.getItem('myCart')) || [];
        const updatedCart = userCart.filter(item => item.id !== id);
        localStorage.setItem('myCart', JSON.stringify(updatedCart));
    } catch (error) {
        console.error('Error removing item from cart and marking as sold:', error);
    }
};

// Add an event listener to the cart button
buttons.forEach(button => {
    button.addEventListener('click', addToCart);
});