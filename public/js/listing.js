// Function to handle form submission
const addListing = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the file input and create a FormData object
    const fileInput = document.querySelector('#myFile');
    const formData = new FormData();

    // Put values into variables
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const category = parseInt(document.querySelector('#cat-drop').value.trim(), 10);
    const item = document.querySelector('#item').value.trim();
    const brand = document.querySelector('#brand').value.trim();
    const year = document.querySelector('#year').value.trim();
    const condition = document.querySelector('#cond-drop').value.trim();
    const price = document.querySelector('#price').value.trim();
    const color = document.querySelector('#clr-drop').value.trim();
    const isSpecialEditionInput = document.querySelector('input[name="is_special_edition"]:checked');
    const isSpecialEdition = isSpecialEditionInput ? isSpecialEditionInput.value.trim() : '';

    // Check if any of the required fields are blank or not valid
    if (
        title === '' ||
        description === '' ||
        isNaN(category) ||
        category <= 0 ||
        item === '' ||
        brand === '' ||
        year === '' ||
        isNaN(year) ||
        condition === '' ||
        price === '' ||
        isNaN(price) ||
        color === '' ||
        isSpecialEdition === null ||
        fileInput.files.length === 0
    ) {
        alert("Please fill out all required fields with valid values.");
        return; // Stop further execution
    }

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        const fileExtension = fileName.split('.').pop().toLowerCase();

        // Array of allowed image file extensions
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        // Check if the file extension is allowed
        if (allowedExtensions.indexOf(fileExtension) === -1) {
            alert("Please upload a valid image file (jpg, jpeg, png, gif).");
            return; // Stop further execution
        }

        // Append the image file to FormData
        formData.append('image', fileInput.files[0]);
    } else {
        alert("Please select an image file.");
        return; // Stop further execution
    }

    // Append other form fields to the FormData object
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category_id', category);

    // If category selected matches number, item value from the user will go into the correct column, leave the other null
    if (category === 1) {
        formData.append('console_name', item);
    } else if (category === 2) {
        formData.append('game_name', item);
    }

    formData.append('console_brand', brand);
    formData.append('year', year);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('color', color);
    formData.append('is_special_edition', isSpecialEdition);

    // Send the form data to the server using fetch
    const response = await fetch('/api/listings/file-upload', {
        method: 'POST',
        body: formData,
    });

    // Check if the response is successful
    if (response.ok) {

        location.reload()
    } else {
        console.log('Error on listing.js');
    }
};


const deleteListing = async (event) => {
    // Prevent the default button click behavior
    event.preventDefault();

    // Get the listing ID from the data-id attribute of the clicked button
    const listingId = event.target.getAttribute('data-id');

    // Confirm with the user before deleting the listing
    const isConfirmed = confirm('Are you sure you want to delete this listing?');

    if (isConfirmed) {
        // Send a DELETE request to the server to delete the listing
        const response = await fetch(`/profile/${listingId}`, {
            method: 'DELETE',
        });

        // Check if the response is successful
        if (response.ok) {
            // Reload the page or update the UI as needed
            location.reload();
        } else {
            console.log('Error deleting listing');
        }
    }
};


// Add a click event listener to the submit button
document.querySelector('#ls-submit').addEventListener('click', addListing);
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteListing);
});

//modal logic to add a listing
const addListingBtn = document.querySelector('#add-ls-btn');
const xClose = document.querySelector('.delete')
const addLsModal = document.querySelector('.modal');

//wrapped in if statement, bc otherwise, error will populate in console when user is logged in bc loginNav will not exist.

addListingBtn.addEventListener('click', (event) => {
    // Functions to open and close a modal
    event.preventDefault();
    addLsModal.classList.add('is-active');
});


xClose.addEventListener('click', (event) => {
    event.preventDefault();
    addLsModal.classList.remove('is-active')
})
