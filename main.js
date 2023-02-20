// Ищем все необходимые DOM элементы
const form = document.querySelector('.form');
const selectAmount = document.getElementById('select-amount');
const selectCardType = document.getElementById('select-card-type');
const list = document.querySelector('.card-list');
const area = document.querySelector('.area');
let timer;
// Создаем таймер
function createTimer() {
  timer = document.createElement('div');
  timer.classList.add('timer');
  timer.setAttribute('id', 'timer');
  area.prepend(timer);
}

// Вешаем обработчик на форму и запускаем игру
form.addEventListener('submit', function (e) {
  e.preventDefault();
  createTimer();
  game();
});

// Создаём массив, куда позже поместим все экземпляры класса карточки
const allCards = [];

// Создаем класс Card для карточки
class Card {
  _open = false;
  _success = false;
  _disabledOpen = false;
  content;
  currentCard;
  currentCardFaceBack;

  constructor(container, cardNumber, cardsAmount, flipCard) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.cardsAmount = cardsAmount;
    this.flipCard = flipCard;
    this.createElement();
  };
  createElement() {
    this.content = this.cardNumber;
    const card = document.createElement('li');
    const cardFace = document.createElement('div');
    const cardFaceBack = document.createElement('div');
    // Задаём стили таблице карточек в зависимости от их количества
    if (this.cardsAmount === 4) {
      list.classList.add('max-width-2');
    } else if (this.cardsAmount === 16) {
      list.classList.add('max-width-4');
    } else if (this.cardsAmount === 36) {
      list.classList.add('max-width-6');
    } else if (this.cardsAmount === 64) {
      list.classList.add('max-width-8');
    } else if (this.cardsAmount === 100) {
      list.classList.add('max-width-10');
    }
    card.classList.add('card');
    cardFace.classList.add('card-face');
    cardFace.textContent = '?';
    cardFaceBack.classList.add('card-face', 'back');
    cardFaceBack.textContent = this.cardNumber;
    card.append(cardFace);
    card.append(cardFaceBack);
    this.container.append(card);

    card.addEventListener('click', () => {
      this.flipCard(this);
    });

    this.currentCard = card;
    this.currentCardFaceBack = cardFaceBack;
    return card;
  };

  set number(value) {
    this.cardNumber = value;
    this.currentCardFaceBack.textContent = value;
    this.content = value;
  }

  get number() {
    return this.cardNumber;
  }

  set open(value) {
    if (value === true) {
      this._open = true;
      this.currentCard.classList.add('flip');
    } else {
      this._open = false;
      this.currentCard.classList.remove('flip');
    }
  };
  get open() {
    return this._open;
  };

  set success(value) {
    if (value === true) {
      this._success = true;
      this.currentCard.classList.add('disable-card');
    } else {
      this._success = false;
      this.currentCard.classList.remove('disable-card');
    }
  };
  get success() {
    return this._success;
  }
}

class AmazingCard extends Card {
  set number(value) {
    this.cardNumber = value;
    this.content = value;
    this.currentCardFaceBack.textContent = '';
    const cardsImgArray = [];
    for (let i = 1; i <= 8; i++) {
      cardsImgArray.push(`./img/${i}.png`);
    }
    const img = document.createElement('img');
    img.classList.add('card-img');
    img.src = cardsImgArray[value - 1];
    img.onerror = function () {
      const imageError = new Error('Не удалось загрузить изображение');
      img.src = './img/error.png';
      throw imageError;
    }
    this.currentCardFaceBack.append(img);
  }
  get number() {
    return this.cardNumber;
  }
}

let timerId;

// Функция игры
function game() {
  const selectAmountValue = Number(selectAmount.value);
  const selectCardTypeValue = selectCardType.value;
  if (selectAmountValue === 4) {
    timer.textContent = 10;
  } else if (selectAmountValue === 16) {
    timer.textContent = 60;
  } else if (selectAmountValue === 36) {
    timer.textContent = 100;
  }
  // Запускаем таймер
  timerId = setInterval(startTimer, 1000);

  // Функция таймера
  function startTimer() {
    let currentNumber = timer.textContent;
    if (currentNumber <= 0) {
      clearInterval(timerId);
      gameOver();
    } else {
      timer.textContent = currentNumber - 1;
    }
  }

  // Создаем массив пар чисел
  let defaultDigits = [];
  for (let i = 1; i <= 8; i++) {
    defaultDigits.push(i,i);
  }

  // Функция перемешивания массива чисел
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Функция фильтрации массива чисел в зависимости от количества карточек
  function filterDigits(array, amount) {
    let resultArray;
    if (amount === 4) {
      resultArray = array.slice(0, -12);
    } else if (amount === 16) {
      resultArray = array;
    } else if (amount === 36) {
      resultArray = ((array.concat(array)).concat(array).slice(0, -12));
    }
    return resultArray;
  }

  // Создаем переменную с нужным количеством чисел в зависимости от выбора игрока
  const gameDigits = filterDigits(defaultDigits, selectAmountValue);

  // Функция создания поля со всеми карточками
  function createCardField(cardsAmount) {
    // Перемешиваем массив пар чисел
    shuffle(gameDigits);
    //Создаём экземпляры класса карточки для каждого числа и кладём их в массив
    for (let cardNumber of gameDigits) {
      if (selectCardTypeValue === 'numbers') {
        const card = new Card(list, cardNumber, cardsAmount, flipCard);
        allCards.push(card);
      } else if (selectCardTypeValue === 'images') {
        const card = new AmazingCard(list, cardNumber, cardsAmount, flipCard);
        allCards.push(card);
        card.number = cardNumber;
      }
    }
  }

  // Создаём нужное количество карточек в зависимости от выбора игрока, если контейнер пустой
  if (list.children.length === 0) {
    createCardField(selectAmountValue);
    form.remove();
    // Если в контейнере уже есть карточки, то присваиваем им новые значения и переворачиваем
  } else {
    shuffle(gameDigits);
    for (let i in gameDigits) {
      allCards[i].number = gameDigits[i];
      allCards[i].open = false;
      allCards[i].success = false;
    }
  }

  // Определяем параметры для игры
  let firstCard;
  let secondCard;
  let anyCardFlipped = false;
  let blockCards = false;

  // Функция переворачивания карточки
  function flipCard(thisCard) {
    if (blockCards) return;
    if (thisCard === firstCard) return;
    if (!thisCard.open) {
      thisCard.open = true;
    } else return;
    if (!anyCardFlipped) {
      firstCard = thisCard;
      anyCardFlipped = true;
    } else {
      secondCard = thisCard;
      // Сравниваем перевернутые карточки
      comparison(firstCard, secondCard);
    }
  }

  // Сброс переменных для следующей пары карточек
  function resetParams() {
    [firstCard, secondCard] = [null, null];
    [blockCards, anyCardFlipped] = [false, false];
  }

  // Функция сравнения первой и второй карточек
  function comparison(firstCard, secondCard) {
    const match = firstCard.content === secondCard.content;
    match ? disableCards() : unflipCards();
  }

  // Функция отключения карточек (чтоб на них нельзя было кликнуть)
  function disableCards() {
    firstCard.success = true;
    secondCard.success = true;
    resetParams();
    const openedCards = [];
    allCards.forEach(card => {
      if (card.open) {
        openedCards.push(card);
      }
    });
    if (openedCards.length === gameDigits.length) {
      clearInterval(timerId);
      timer.textContent = 'Вы отлично справились! :)';
      createRestartButton();
    }
  }

  // Перевернуть две карточки рубашкой вверх в случае несовпадения
  function unflipCards() {
    blockCards = true;
    setTimeout(() => {
      if (!firstCard._disabledOpen && !secondCard._disabledOpen) {
        firstCard.open = false;
        secondCard.open = false;
      }
      resetParams();
    }, 900);
  }

  // Функция создания кнопки рестарта
  function createRestartButton() {
    const button = document.createElement('button');
    button.textContent = 'Сыграть ещё раз';
    button.classList.add('restart-button');
    area.append(button);
    button.addEventListener('click', restart);
  }

  // Функция рестарта
  function restart() {
    setTimeout(game, 100);
    resetParams();
    allCards.forEach(card => {
      card.open = false;
      card.success = false;
      card._disabledOpen = false;
    });
    const button = document.querySelector('.restart-button');
    button.remove();
  }

  // Функция проигрыша
  function gameOver() {
    blockCards = true;
    allCards.forEach(card => {
      card.open = true;
      card.success = true;
      card._disabledOpen = true;
    });
    timer.textContent = 'Время вышло :(';
    createRestartButton();
  }
}
