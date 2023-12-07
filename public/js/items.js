
// Get the current URL
var currentUrl = window.location.pathname;

// Extract relevant information from the URL
var urlParts = currentUrl.split('/');
var category = urlParts[2];  // Assuming category is the third part of the URL

// Dynamically set the h1 content based on the extracted information
var pageTitle = document.createElement('h1');

if (category === 'consoles') {
    pageTitle.textContent = 'Consoles';
} else if (category === 'games') {
    pageTitle.textContent = 'Games';
} else {
    pageTitle.textContent = 'Other Category';  // Add more conditions as needed
}

// Append the h1 element to the body
document.body.appendChild(pageTitle);
