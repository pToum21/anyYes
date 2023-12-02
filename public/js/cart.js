
const addToCart = async () => {
    try {
        

        const response = await fetch(`/cart`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-type': 'application/json' }
        });

        if (response.ok) {
            console.log('Item added to cart successfully');
        } else {
            alert('Error adding to cart');
        }
    } catch (error) {
        console.error(error.message);
    }
};

document.querySelector('.cart-btn').addEventListener('click', addToCart);