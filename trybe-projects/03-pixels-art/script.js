window.onload = function () {
  const blackPixelPalette = document.querySelector('.black');
  blackPixelPalette.classList.add('selected');

  // Paleta de cores aleatória
  const colors = document.querySelectorAll('.color');
  for (let index = 1; index < colors.length; index += 1) {
    const rComponent = Math.ceil(Math.random() * 255);
    const gComponent = Math.ceil(Math.random() * 255);
    const bComponent = Math.ceil(Math.random() * 255);
    const randomColor = `rgb(${rComponent}, ${gComponent}, ${bComponent})`;
    colors[index].style.backgroundColor = randomColor;
  }
};

// Pintando o pixel
function changeColor(event) {
  const selectedColor = document.querySelector('.selected');
  if (event.target.style.backgroundColor !== selectedColor.style.backgroundColor) {
    event.target.style.backgroundColor = selectedColor.style.backgroundColor;
  } else {
    event.target.style.backgroundColor = 'white';
  }
}

function paintPixel() {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    const pixelClicked = pixels[index];
    pixelClicked.removeEventListener('click', changeColor);
    pixelClicked.addEventListener('click', changeColor);
  }
}

paintPixel();

// Selecionando a cor
function selectColor() {
  const colorPalette = document.querySelectorAll('.color');
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].addEventListener('click', function (event) {
      const selectedColor = document.querySelector('.selected');
      selectedColor.classList.remove('selected');
      event.target.classList.add('selected');
    });
  }
}

selectColor();

// Limpar pixels
function clearingPixels() {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}
function clearBoard() {
  const clearPixels = document.querySelector('#clear-board');
  clearPixels.addEventListener('click', function () {
    clearingPixels();
  });
}

clearBoard();

// Personaliza tamanho do quadro
function addPixels(sizeValue, pixels) {
  const pixelBoard = document.querySelector('#pixel-board');
  const pixelSize = 42;
  pixelBoard.style.width = `${sizeValue * pixelSize}px`;
  while (pixels.length < sizeValue ** 2) {
    const newPixel = document.createElement('div');
    newPixel.className = 'pixel';
    pixelBoard.appendChild(newPixel);
    pixels = document.querySelectorAll('.pixel');
  }
}

function removePixels(sizeValue, pixels) {
  const pixelBoard = document.querySelector('#pixel-board');
  const pixelSize = 42;
  pixelBoard.style.width = `${sizeValue * pixelSize}px`;
  while (pixels.length > sizeValue ** 2) {
    pixelBoard.removeChild(pixels[pixels.length - 1]);
    pixels = document.querySelectorAll('.pixel');
  }
}

function resize(sizeValue) {
  const pixels = document.querySelectorAll('.pixel');
  if (sizeValue < Math.sqrt(pixels.length)) {
    removePixels(sizeValue, pixels);
  } else {
    addPixels(sizeValue, pixels);
  }
  paintPixel();
}

function changeSize() {
  const changeButton = document.querySelector('#board-size');
  changeButton.addEventListener('input', function () {
    const newSize = document.querySelector('#board-size').value;
    clearingPixels();
    resize(newSize);
  });
}

changeSize();
