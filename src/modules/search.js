// Search module
// Функции поиска и валидации

import { 
  searchInput, 
  searchButton, 
  goodsCards, 
  hiddenedCards, 
  originalPlaceholder, 
  typingInterval 
} from './variables.js';

// Input section
searchInput.addEventListener('focus', () => {
  clearInterval(typingInterval);
  searchInput.setAttribute('data-placeholder', originalPlaceholder);
  searchInput.removeAttribute('placeholder');
  searchInput.value = '';
});

searchInput.addEventListener('blur', () => {
  clearInterval(typingInterval);
  if (!searchInput.value && searchInput.getAttribute('data-placeholder')) {
    startTypingAnimation();
    searchInput.removeAttribute('data-placeholder');
  }
});

function startTypingAnimation() {
  const fullText = searchInput.getAttribute('data-placeholder') || '';
  let currentText = '';
  let index = 0;

  clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    if (index < fullText.length) {
      currentText += fullText[index];
      searchInput.placeholder = currentText;
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);
}

searchInput.addEventListener('input', () => {
  if (searchInput.value) {
    clearInterval(typingInterval);
    searchInput.removeAttribute('placeholder');
  }
});

// Input searching
function validateInput(input) {
  if (!input.value.trim()) {
    input.focus();
    return false;
  }
  
  const dangerousPatterns = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /alert\s*\(/gi,
    /document\./gi,
    /window\./gi,
    /<\/?\w+[^>]*>/gi 
  ];
  
  for (let pattern of dangerousPatterns) {
    if (pattern.test(input.value)) {
      alert('Обнаружен запрещенный код');
      input.value = input.value.replace(pattern, '');
      return false;
    }
  }
  
  return true;
}

function coincidencesInCardNames(card, searchLower) {
  const generalWordSearch = 'nft';
  const cardName = card.getAttribute('name');
  const cardTitleDiv = card.querySelector('.goods__card__title')?.textContent || '';
  const cardContent = (cardName + ' ' + generalWordSearch + ' ' + cardTitleDiv).toLowerCase();
  return cardContent.includes(searchLower);
}

function searchForMatches(searchLower) {
  addAllCards();
  goodsCards.forEach((card) => {
    const isMatch = coincidencesInCardNames(card, searchLower);

    if (!isMatch) {
      card.classList.add('card__hidenned');
      hiddenedCards.push(card);
    }
  });
}

function addAllCards() {
  hiddenedCards.forEach((card) => {
    card.classList.remove('card__hidenned');
  });
  hiddenedCards = [];
}

searchButton.addEventListener('click', (event) => {
  if (validateInput(searchInput)) {
    event.preventDefault();
  }
  let searchLower = searchInput.value.toLowerCase();
  searchForMatches(searchLower);
});

// Экспортируем функции для использования в других модулях
export { addAllCards, hiddenedCards };
