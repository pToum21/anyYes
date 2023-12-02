const addPhoto = async () => {
    const fileInput = document.querySelector('#myFile');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    // Append other form fields to the FormData object
    formData.append('title', document.querySelector('#title').value.trim());
    formData.append('description', document.querySelector('#description').value.trim());
    formData.append('category', document.querySelector('#cat-drop').value.trim());
    formData.append('item', document.querySelector('#item').value.trim());
    formData.append('console_brand', document.querySelector('#brand').value.trim());
    formData.append('year', document.querySelector('#year').value.trim());
    formData.append('condition', document.querySelector('#cond-drop').value.trim());
    formData.append('price', document.querySelector('#price').value.trim());
    formData.append('color', document.querySelector('#clr-drop').value.trim());
    formData.append('is_special_edition', document.querySelector('input[name="is_special_edition"]:checked').value.trim());

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
    const category = document.querySelector('#cat-drop').value.trim();
    const item = document.querySelector('#item').value.trim();
    const brand = document.querySelector('#brand').value.trim();
    const year = document.querySelector('#year').value.trim();
    const condition = document.querySelector('#cond-drop').value.trim();
    const price = document.querySelector('#price').value.trim();
    const color = document.querySelector('#clr-drop').value.trim();
    const isSpecialEdition = document.querySelector('input[name="is_special_edition"]:checked').value.trim();

    const payload = {
        title,
        description,
        category,
        item,
        console_brand: brand,
        year,
        condition,
        price,
        color,
        is_special_edition: isSpecialEdition,
    };

    if (category === 'Game') {
        payload.game_name = item;
    } else if (category === 'Console') {
        payload.console_name = item;
    }

    console.log(title)
    console.log(description)
    console.log(category)
    console.log(item)
    console.log(brand)
    console.log(year)
    console.log(condition)
    console.log(price)
    console.log(color)
    console.log(isSpecialEdition)


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