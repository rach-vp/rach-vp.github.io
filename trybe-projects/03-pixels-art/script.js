function randomColor() {
  const rComponent = Math.ceil(Math.random() * 255);
  const gComponent = Math.ceil(Math.random() * 255);
  const bComponent = Math.ceil(Math.random() * 255);
  return `rgb(${rComponent}, ${gComponent}, ${bComponent})`;
}

window.onload = function () {
  const blackPixelPalette = document.querySelector('.black');
  blackPixelPalette.classList.add('selected');

  // Paleta de cores aleatória
  const colors = document.querySelectorAll('.color');
  for (let index = 1; index < colors.length; index += 1) {
    colors[index].style.backgroundColor = randomColor();
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
function addPixels(sizeValue, pixels, pixelsBoard) {
  const pixelSize = 42;
  pixelsBoard.style.width = `${sizeValue * pixelSize}px`;
  while (pixels.length < sizeValue ** 2) {
    const newPixel = document.createElement('div');
    newPixel.className = 'pixel';
    pixelsBoard.appendChild(newPixel);
    pixels = document.querySelectorAll('.pixel');
  }
}

function removePixels(sizeValue, pixels, pixelsBoard) {
  const pixelSize = 42;
  pixelsBoard.style.width = `${sizeValue * pixelSize}px`;
  while (pixels.length > sizeValue ** 2) {
    pixelsBoard.removeChild(pixels[pixels.length - 1]);
    pixels = document.querySelectorAll('.pixel');
  }
}

function resizeBoard(sizeValue) {
  const pixelBoard = document.querySelector('#pixel-board');
  const pixels = document.querySelectorAll('.pixel');
  if (sizeValue < Math.sqrt(pixels.length)) {
    removePixels(sizeValue, pixels, pixelBoard);
  } else {
    addPixels(sizeValue, pixels, pixelBoard);
  }
  paintPixel();
}

function changeSize() {
  const changeButton = document.querySelector('#board-size');
  changeButton.addEventListener('input', function () {
    const newSize = document.querySelector('#board-size').value;
    clearingPixels();
    resizeBoard(newSize);
  });
}

changeSize();

// Personaliza paleta de cores
function selectUnrepeatedColor(colors) {
  bgColor = randomColor();
  colorsArray = []
  for (let index = 0; index < colors.length; index += 1) {
    colorsArray.push();
  }
  while (colorsArray.includes(bgColor)) {
    bgcolor = randomColor();
  }
  return bgColor;
}
function addColors(colorsAmount, colors, colorsPalette) {
  while (colors.length < colorsAmount) {
    const newColor = document.createElement('div');
    newColor.className = 'color';
    newColor.style.backgroundColor = selectUnrepeatedColor(colors);
    colorsPalette.appendChild(newColor);
    colors = document.querySelectorAll('.color');
  }
}

function resizePalette(paletteSize) {
  const colorsPalette = document.querySelector('#color-palette')
  const colors = document.querySelectorAll('.color');
  if (paletteSize > colors.length) {
    addColors(paletteSize, colors, colorsPalette);
  } else {
    removeColors(paletteSize, colors, colorsPalette);
  }
  selectColor();
}

function updatePalette() {
  const paletteInput = document.querySelector('#palette-size');
  paletteInput.addEventListener('input', function () {
    resizePalette(paletteInput.value);
  })
}

updatePalette();
