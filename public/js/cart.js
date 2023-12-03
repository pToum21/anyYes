
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
                console.log(data.listing);
                let userCart = JSON.parse(localStorage.getItem('myCart')) || [];
                userCart.push(data.listing)
                localStorage.setItem('myCart', JSON.stringify(userCart))

            })

    } catch (error) {
        console.error(error.message);
    }
};

document.querySelector('.cart-btn').addEventListener('click', addToCart);