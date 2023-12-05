//mobile menu

const burger = document.querySelector('#burger');
const navMenu = document.querySelector('#menu');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn')

searchBtn.addEventListener('click', searchForItems)


function searchForItems(event) {
    event.preventDefault();
    const userInput = searchBar.value;
    window.location.assign(`/?q=${userInput}`)
    // const searchDiv = document.querySelector('#searchResults');
    // console.log(searchDiv);
    // console.log(userInput);


    // fetch('/api/listings')
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error('Error: ' + response.status);
    //         }
    //     })
    //     .then(function (data) {
           
            
    //         let matchingTitles = [];

    //         for (let i = 0; i < data.listings.length; i++) {
    //             const title = data.listings[i].title;

    //             console.log(title);
            
    //             if (title.toLowerCase().includes(userInput.toLowerCase())) {
    //                 matchingTitles.push(data.listings[i].title);
    //                 console.log('we found a match');
    //             }
    //         }
            
    //         // Move console logs outside of the loop to see the final result
    //         console.log(matchingTitles);
            
    //         // Check if there are matching titles before redirecting
    //         if (matchingTitles.length > 0) {
    //             // Set the content of searchDiv after the loop
    //             searchDiv.textContent = matchingTitles.join(', '); // You can customize the join separator
    //             location.replace('/searchResults');
    //         } else {
    //             console.log('No matches found');
    //         }
    //     })
    //     .catch(function (err) {
    //         console.error(err);
    //     });
      
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
