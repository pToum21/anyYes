//mobile menu
const burger = document.querySelector('#burger');
const navMenu = document.querySelector('#menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active');
    navMenu.setAttribute('style', 'text-align: center');
    navMenu.classList.remove('m-5', 'p-2');

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

loginNav.addEventListener('click', (event) => {
    // Functions to open and close a modal
    event.preventDefault();
      loginModal.classList.add('is-active');
});

xClose.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.classList.remove('is-active')
})
  
//     function closeModal(loginModal) {
//         loginModal.classList.remove('is-active');
//     }
  
//     function closeAllModals() {
//       (document.querySelectorAll('.modal') || []).forEach(($modal) => {
//         closeModal($modal);
//       });
//     }
  
//     // Add a click event on buttons to open a specific modal
//     (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
//       const modal = $trigger.dataset.target;
//       const $target = document.getElementById(modal);
  
//       $trigger.addEventListener('click', () => {
//         openModal($target);
//       });
//     });
  
//     // Add a click event on various child elements to close the parent modal
//     (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
//       const $target = $close.closest('.modal');
  
//       $close.addEventListener('click', () => {
//         closeModal($target);
//       });
//     });
  
//     // Add a keyboard event to close all modals
//     document.addEventListener('keydown', (event) => {
//       if (event.code === 'Escape') {
//         closeAllModals();
//       }
//     });
//   });