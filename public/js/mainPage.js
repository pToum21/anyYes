//mobile menu

const burger = document.querySelector('#burger');
const navMenu = document.querySelector('#menu');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');


//function for getting search information
function searchForItems(event) {
    event.preventDefault()
    const userInput = searchBar.value;
    console.log(userInput)


    //     fetch() 
    // .then()
    // .then()
};
//event listener for clicking search button
searchBtn.addEventListener('click', searchForItems)


//for navburger dropdown
burger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active');
    navMenu.classList.remove('m-5');
    navMenu.classList.remove('p-2');
    navMenu.setAttribute('style', 'text-align: center')

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
