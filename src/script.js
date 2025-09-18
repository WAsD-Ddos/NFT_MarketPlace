const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');


let originalPlaceholder = searchInput.placeholder;
let typingInterval;

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
