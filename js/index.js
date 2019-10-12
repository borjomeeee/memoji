const init = function() {
    let cards = document.querySelectorAll('.game__card');

    let emodjies = ['rabbit', 'pig', 'lion', 'bear', 'fox', 'monkey'];
    emodjies = emodjies.concat(emodjies);

    let playingCards = [];

    cards.forEach((card, indx) => {
        let numEmodjie = Math.floor(Math.random() * emodjies.length);
        card.classList.add(emodjies[numEmodjie]);

        card.dataset.index = indx;

        emodjies.splice(numEmodjie, 1);

        card.addEventListener('click', (event) => {
            if(card.classList.contains('game__card_error') || card.classList.contains('game__card_success')) {
                return;
            }

            let errorCards = document.querySelectorAll('.game__card_error');
            if(errorCards.length != 0) {
                errorCards.forEach(elem => elem.classList.remove('game__card_error'));
            }

            card.classList.toggle('game__card_show');

            playingCards = Array.from(document.querySelectorAll('.game__card_show'));

            if(playingCards.length == 2) {
                if(playingCards[0].classList.value == playingCards[1].classList.value) {
                    playingCards.forEach(elem => elem.classList.add('game__card_success'));
                } else {
                    playingCards.forEach(elem => elem.classList.add('game__card_error'));
                }

                playingCards.forEach(elem => elem.classList.remove('game__card_show'));
                playingCards = [];
            }
        })
    });

}

document.onload = init();