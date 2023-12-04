//mobile menu

const burger = document.querySelector('#burger');
const navMenu = document.querySelector('#menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active');
});