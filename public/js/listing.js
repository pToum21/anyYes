
// everything writes to the database but console_name and game_name both getting written to
const addListing = async () => {
    const fileInput = document.querySelector('#myFile');
    const formData = new FormData();

    //put values into variables
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const category = parseInt(document.querySelector('#cat-drop').value.trim(), 10);
    const item = document.querySelector('#item').value.trim();
    const brand = document.querySelector('#brand').value.trim();
    const year = document.querySelector('#year').value.trim();
    const condition = document.querySelector('#cond-drop').value.trim();
    const price = document.querySelector('#price').value.trim();
    const color = document.querySelector('#clr-drop').value.trim();
    const isSpecialEdition = document.querySelector('input[name="is_special_edition"]:checked').value.trim();


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


    formData.append('image', fileInput.files[0]);

    // Append other form fields to the FormData object
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category_id', category);
    //if category selected matches number, item value from user will go into correct column, leave the other null
    if (category === 1) {
        formData.append('console_name', item);
    } else if (category === 2) {
        formData.append('game_name', item);
    };
    formData.append('console_brand', brand);
    formData.append('year', year);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('color', color);
    formData.append('is_special_edition', isSpecialEdition);

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



document.querySelector('#ls-submit').addEventListener('click', addListing);