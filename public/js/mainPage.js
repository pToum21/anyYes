//mobile menu
const burger = document.querySelector('#burger');
const navMenu = document.querySelector('#menu');
const navbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active');
    navMenu.setAttribute('style', 'text-align: center');
    navMenu.classList.remove('m-5', 'p-2');
    navbar.classList.remove('p-4');
    const navItems = document.querySelectorAll('#menu .nav-item');

    navItems.forEach(function (item, index) {
        if (index % 2 === 0) {
            item.style.backgroundColor = '#375c7d';
        } else {
            item.style.backgroundColor = '#2c4359';
        }
        item.style.display = 'block';
        item.style.width = '100%';
    });
});


//search feature
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', searchForItems);

function searchForItems(event) {
    event.preventDefault();
    const userInput = searchBar.value;
    window.location.assign(`/?q=${userInput}`);
};

//modal js
const loginNav = document.querySelector('#login-nav');
const xClose = document.querySelector('.delete')
const loginModal = document.querySelector('.modal');

if (loginNav) {
    loginNav.addEventListener('click', (event) => {
        // Functions to open and close a modal
        event.preventDefault();
        loginModal.classList.add('is-active');
    });
};

xClose.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.classList.remove('is-active')
})
