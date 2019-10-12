const CLASS_CARD_SHOW = 'game__card_show';
const CLASS_CARD_SUCESS = 'game__card_success';
const CLASS_CARD_ERROR = 'game__card_error';

const COUNT_CARD_END = 6;

const showLoseNotification = function() {
    document.querySelector('#lose-notification').classList.remove('hidden');
}

const showWinNotification = function() {
    document.querySelector('#win-notification').classList.remove('hidden');
}

const cardsClickListener = function(cards) {
    let playingCards = [];
    let countSuccess = 0;

    cards.forEach(card => card.addEventListener('click', clickListener));

    let timer = setInterval(setTime(), 1000);

    function clickListener(event) {
        if(event.target.classList.contains('game__card')) {
            return;
        }

        let card =  event.target.classList.contains('card__top-side') || 
                    event.target.classList.contains('card__down-side') ? 
                    event.target.parentNode : 
                    event.target.parentNode.parentNode;

        if(card.classList.contains(CLASS_CARD_ERROR) || card.classList.contains(CLASS_CARD_SUCESS)) {
            return;
        }
    
        let errorCards = document.querySelectorAll('.' + CLASS_CARD_ERROR);
        if(errorCards.length != 0) {
            errorCards.forEach(elem => elem.classList.remove(CLASS_CARD_ERROR));
        }
    
        card.classList.toggle(CLASS_CARD_SHOW);
    
        playingCards = Array.from(document.querySelectorAll('.' + CLASS_CARD_SHOW));
    
        if(playingCards.length == 2) {
            if(playingCards[0].classList.value == playingCards[1].classList.value) {
                playingCards.forEach(elem => {
                    elem.classList.add(CLASS_CARD_SUCESS);
                    elem.removeEventListener('click', clickListener);
                });

                countSuccess++;
            } else {
                playingCards.forEach(elem => elem.classList.add(CLASS_CARD_ERROR));
            }
    
            playingCards.forEach(elem => elem.classList.remove(CLASS_CARD_SHOW));
            playingCards = [];
        }

        if(countSuccess == COUNT_CARD_END) {
            clearInterval(timer);

            showWinNotification();
        }
    }

    function showTime(sec, min) {
        let minTimer = document.querySelector('#minutes');
        let secTimer = document.querySelector('#seconds');
        
        let strMin = min.toString().length == 1 ? '0' + min : min;
        let strSec = sec.toString().length == 1 ? '0' + sec : sec;

        minTimer.innerHTML = strMin;
        secTimer.innerHTML = strSec;
    }

    function setTime() {    
        let min = 1;
        let sec = 0;
    
        return function() {
            showTime(sec, min);

            if(sec == 0) {
                if(min == 0) {
                    clearInterval(timer);
    
                    cards.forEach(card => card.removeEventListener('click', clickListener));
                    showLoseNotification();
                } else {
                    min--;
                    sec = 59;
                }
            } else {
                sec--;
            }
        }
    }
}

const init = function() {
    let notificationButtons = document.querySelectorAll('.notification__submit');

    notificationButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentNode.parentNode.classList.add('hidden');

            startGame();
        })
    });

    startGame();
}

const startGame = function() {
    let cards = document.querySelectorAll('.game__card');

    let emodjies = ['rabbit', 'pig', 'lion', 'bear', 'fox', 'monkey'];

    cards.forEach(card => {
        card.classList.remove(CLASS_CARD_SHOW);
        card.classList.remove(CLASS_CARD_SUCESS);
        card.classList.remove(CLASS_CARD_ERROR);

        emodjies.some(em => {
            if(card.classList.contains(em)) {
                card.classList.remove(em);
                return true;
            }
        })
    })

    emodjies = emodjies.concat(emodjies);

    cards.forEach(card => {
        let numEmodjie = Math.floor(Math.random() * emodjies.length);
        card.classList.add(emodjies[numEmodjie]);

        emodjies.splice(numEmodjie, 1);
    });

    cardsClickListener(cards);
}

document.onload = init();