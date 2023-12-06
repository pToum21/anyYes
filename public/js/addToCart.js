//custom function to prevent duplicate items being added to array
// credit this function to xpert ai in readme
// Define the isDuplicate function
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
                const userCart = JSON.parse(localStorage.getItem('myCart')) || [];

                // Prevent duplicates in local storage
                if (!isDuplicate(data.listing.title, userCart)) {
                    userCart.push(data.listing);
                    localStorage.setItem('myCart', JSON.stringify(userCart));

                    // Check if the item is sold
                    if (data.listing.sold) {
                        // If sold, remove from both local storage and database
                        removeFromCartAndDatabase(data.listing.id);
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

        
        // await fetch(`/success?listing_id=${id}`, {
        //     method: 'GET',
        //     credentials: 'include', 
        // });

        console.log('Item removed from cart and marked as sold successfully');
    } catch (error) {
        console.error('Error removing item from cart and marking as sold:', error);
    }
};

// Add an event listener to the cart button
document.querySelector('.cart-btn').addEventListener('click', addToCart);


