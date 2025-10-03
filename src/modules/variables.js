// Variables module
// Все основные переменные приложения

export const sidebar = document.querySelector('.sidebar');
export const sidebarBtn = document.getElementById('sidebar_img-button');
export const headerBurgerBtn = document.querySelector('.burger');

export const searchForm = document.querySelector('.search');
export const searchInput = document.querySelector('.search__input');
export const searchButton = document.querySelector('.search__button');

export const filterdButtons = document.querySelector(".goods__button-group");
export const goodsCards = document.querySelectorAll('.goods__card');
export let hiddenedCards = [];

// Input section variables
export let originalPlaceholder = searchInput.placeholder;
export let typingInterval;
