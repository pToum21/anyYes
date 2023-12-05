//mobile menu

const burger = document.querySelector('#burger');
const navMenu = document.querySelector('#menu');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn')

searchBtn.addEventListener('click', searchForItems)


function searchForItems(event) {
    event.preventDefault()
    const userInput = searchBar.value;
    console.log(userInput)


    //     fetch() 
    // .then()
    // .then()
}





burger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active');
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
        // item.setAttribute('style', 'line-height: normal');
    });
});
