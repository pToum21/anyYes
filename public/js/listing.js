

// this should work but the rest of the logic for the profile form must be filled out first
const addPhoto = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector('#myFile')
    const formData = new FormData();

    formData.append('image', fileInput.files[0])

    for (const value of formData.values()) {
        console.log(value);
    }

    const response = await fetch('/api/listings/file-upload', {
        method: 'POST',
        body: formData,
    });


    if (response.ok) {
        console.log(response)
        console.log('image posted')
    } else {
        alert('Failed to upload image, Try again')
    }
}


document.querySelector('#photo-submit').addEventListener('click', addPhoto);