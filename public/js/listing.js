const addPhoto = async () => {
    const fileInput = document.querySelector('#myFile');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    for (const value of formData.values()) {
        console.log(value);
    }

    const response = await fetch('/api/listings/file-upload', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        console.log(response);
        console.log('image posted');
    } else {
        alert('Failed to upload image, Try again');
    }
};

const addListing = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const category = document.querySelector('#cat-drop');
    const item = document.querySelector('#item').value.trim();
    const brand = document.querySelector('#brand').value.trim();
    const year = document.querySelector('#year').value.trim();
    const condition = document.querySelector('#con-drop');
    const price = document.querySelector('#price').value.trim();
    const color = document.querySelector('#clr-drop');
    const isSpecialEdition = document.querySelector('#ls-special');

    const payload = {
        title,
        description,
        category,
        item,
        brand,
        year,
        condition,
        price,
        color,
        isSpecialEdition,
    };

    if (category === 'Game') {
        payload.game_name = item;
    } else if (category === 'Console') {
        payload.console_name = item;
    }

    const response = await fetch('/api/listings', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
        console.log('nice');
        addPhoto(); // Call the addPhoto function after the listing is added
    } else {
        alert('Failed to make a listing, Try again');
    }
};

document.querySelector('#ls-submit').addEventListener('click', addListing);

// document.querySelector('#photo-submit').addEventListener('click', addPhoto);
// document.querySelector('#ls-submit').addEventListener('click', addListing)