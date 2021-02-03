const getCards = () => document.querySelectorAll('.item');
const getHidden = () => document.querySelectorAll('.hidden');

const computedStyle = (element, property) =>
  window.getComputedStyle(document.querySelector(element))[property];

const intValue = (string) => parseFloat(string.substring(0, string.indexOf('px')));

const getWidth = (element) => {
  const strWidth = computedStyle(element, 'width');
  const strMarginLeft = computedStyle(element, 'marginLeft');
  const strMarginRight = computedStyle(element, 'marginRight');
  return intValue(strWidth) + intValue(strMarginLeft) + intValue(strMarginRight);
}

prevButton.addEventListener('click', () => {
  const carouselWidth = getWidth('.items');
  const cardWidth = getWidth('.item');
  const itemsPerRow = Math.floor(carouselWidth / cardWidth);
  console.log(itemsPerRow);
});

nextButton.addEventListener('click', () => {
  const carouselWidth = window.getComputedStyle(document.querySelector('.carousel')).width;
  const cardWith = window.getComputedStyle(document.querySelector('.item')).width;
  // console.log(carouselWidth, cardWith);
});
