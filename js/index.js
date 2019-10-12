const cards = document.querySelectorAll('.game__card');

cards.forEach(card => card.addEventListener('click', (event) => {
    card.classList.toggle('game__card_show');
}));