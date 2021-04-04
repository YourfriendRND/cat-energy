// Menu items for mobile-screens
const menuButton = document.querySelector(".header-main__toggle-navigation");
const mainNavigation = document.querySelector(".main-navigation");

menuButton.classList.remove("visually-hidden");
mainNavigation.classList.add("main-navigation--js-active");
menuButton.classList.add("header-main__toggle-navigation--closed");

menuButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (menuButton.classList.contains("header-main__toggle-navigation--closed")) {
    menuButton.classList.remove("header-main__toggle-navigation--closed");
    menuButton.classList.add("header-main__toggle-navigation--opened");
    mainNavigation.classList.remove("main-navigation--js-active");
  }
  else {
    menuButton.classList.remove("header-main__toggle-navigation--opened");
    menuButton.classList.add("header-main__toggle-navigation--closed");
    mainNavigation.classList.add("main-navigation--js-active")
  }
})

// Slider's buttons
const beforeButton = document.querySelector(".example-range-controls__value--min");
const afterButton = document.querySelector(".example-range-controls__value--max");
const fatBlock = document.querySelector(".example-pictures__fat");
const slimBlock = document.querySelector(".example-pictures__slim");

afterButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (!slimBlock.classList.contains("example-pictures__slim--visible")) {
    slimBlock.classList.remove("example-pictures__slim--invisible")
    slimBlock.classList.add("example-pictures__slim--visible")
    fatBlock.classList.add("example-pictures__fat--invisible")
  }
})

beforeButton.addEventListener("click", function(evt) {
  evt.preventDefault();

  if(slimBlock.classList.contains("example-pictures__slim--visible") || fatBlock.classList.contains("example-pictures__fat--invisible") || !fatBlock.classList.contains("example-pictures__fat-visible example-pictures__fat-invisible")) {
    slimBlock.classList.remove("example-pictures__slim--visible")
    fatBlock.classList.remove("example-pictures__fat--invisible")
    slimBlock.classList.add ("example-pictures__slim--invisible")
    fatBlock.classList.add("example-pictures__fat--visible")
  }
})
