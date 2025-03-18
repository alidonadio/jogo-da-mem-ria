const gameContainer = document.querySelector('.game-container');
const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [];
let flippedCards = [];
let matchedCards = 0;

function criarCartas() {
    const deck = [...symbols, ...symbols];
    deck.sort(() => 0.5 - Math.random());

    deck.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        card.innerHTML = `
            <div class="front">?</div>
            <div class="back">${symbol}</div>
        `;

        card.addEventListener('click', virarCarta);
        gameContainer.appendChild(card);
        cards.push(card);
    });
}

function virarCarta() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checarPar();
        }
    }
}

function checarPar() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === cards.length) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

function reiniciarJogo() {
    gameContainer.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    criarCartas();
}

criarCartas();