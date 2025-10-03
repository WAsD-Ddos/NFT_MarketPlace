// Filter module
// Функции для фильтрации карточек товаров

import { filterdButtons, goodsCards, hiddenedCards } from './variables.js';
import { addAllCards } from './search.js';

// Filtered section
function replaceButtonWithColor(target) {
  let elem = filterdButtons.querySelector(".button__choosed");
  elem.classList.remove('button__choosed');
  target.classList.add('button__choosed');
}

function filterCards(type) {
  addAllCards();
  goodsCards.forEach((card) => {
    const typeOf = card.getAttribute('type_of');
    if (typeOf !== type) {
      card.classList.add('card__hidenned');
      hiddenedCards.push(card);
    }
  });
}

// Event listener для фильтрации
filterdButtons.addEventListener('click', function (e) {
  if (e.target.classList.contains('goods__button')) {
    replaceButtonWithColor(e.target);
    let art = 'art';
    let pixel = 'pixel';
    if (e.target.value === art) {
      filterCards(art);
    }
    else if (e.target.value === pixel) {
      filterCards(pixel);
    }
    else {
      addAllCards();
    }
  }
});

// Экспортируем функции для использования в других модулях
export { replaceButtonWithColor, filterCards };
