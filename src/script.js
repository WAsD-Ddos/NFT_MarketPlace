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

// Sidebar burger (logo) toggle for <=1024px


const sidebar = document.querySelector('.sidebar');
const sidebarBtn = document.getElementById('sidebar_img-button');
const headerBurgerBtn = document.querySelector('.burger');

function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('sidebar--close');
  document.addEventListener('click', handleClickOutside);
}

function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('sidebar--close');
  document.removeEventListener('click', handleClickOutside);
}

function handleClickOutside(event) {
  if (!sidebar.contains(event.target) && 
      event.target !== headerBurgerBtn && 
      event.target !== sidebarBtn) {
    closeSidebar();
  }
}


sidebarBtn.addEventListener('click', closeSidebar);

  headerBurgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (sidebar.classList.contains('sidebar--close')) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });





