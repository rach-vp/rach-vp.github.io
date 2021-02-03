const search = (url, query) => url.replace('$QUERY', query);
const sumSpan = document.querySelector('.cart__price');
const emptyCartButton = document.querySelector('.empty-cart');
const cart = document.querySelector('.cart__items');
const showCartButton = document.querySelector('.show-cart-button');
const cartSection = document.querySelector('.cart');
const closeCartButton = document.querySelector('.cart__close');

async function updateSumOfPrices() {
  const items = Array.from(document.querySelectorAll('.cart__item'));
  const sum = !items ? 0 : items.map((item) => {
    const text = item.innerText;
    return parseFloat(text.substring(text.indexOf('$') + 1));
  }).reduce((acc, price) => acc + price, 0);
  sumSpan.innerText = !sum ? 'Seu carrinho está vazio' : `R$${(Math.round(sum * 100) / 100).toFixed(2)}`;
}

emptyCartButton.addEventListener('click', () => {
  if (!cart.children.length) {
    window.alert('O carrinho já está vazio!');
  } else {
    while (cart.children.length) cart.removeChild(cart.firstChild);
    updateSumOfPrices();
    localStorage.clear();
  }
});

async function fetchAds(query) {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';

  try {
    const ads = await fetch(search(url, query)).then(response => response.json());
    if (ads.error) throw new Error(`${ads.status}: ${ads.message}`);
    return ads.results;
  } catch (error) {
    window.alert(error);
    return undefined;
  }
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function cartItemClickListener(event) {
  const description = event.target.innerText;
  event.target.remove();
  updateSumOfPrices();
  localStorage.removeItem(description.substring(5, 18));
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: R$${parseFloat(salePrice).toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function addItemToCart(event) {
  const sku = getSkuFromProductItem(event.target.parentNode);
  const url = 'https://api.mercadolibre.com/items/$QUERY';

  try {
    const productInfo = await fetch(search(url, sku))
    .then(response => response.json());
    const newCartItem = createCartItemElement(productInfo);

    const { id, title, price } = productInfo;
    localStorage.setItem(id, JSON.stringify({ id, title, price }));

    cart.appendChild(newCartItem);

    updateSumOfPrices();
  } catch (error) {
    window.alert(error);
  }
}

function removeLoader() {
  const loader = document.querySelector('.loading');
  loader.parentNode.removeChild(loader);
}

function loadShoppingCart() {
  Object.values(localStorage).forEach((item) => {
    const newItem = createCartItemElement(JSON.parse(item));
    cart.appendChild(newItem);
  });
}

function formatCarousel() {
  const breakpoints = [
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 935,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1175,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      }
  ];

  const config = {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: {
      prev: '.prev-button',
      next: '.next-button',
    },
    dots: '.carousel-dots',
    rewind: true,
  }
  config.responsive = breakpoints;

  new Glider(document.querySelector('.items'), config)
}

function formatPrices() {
  const adPrices = document.querySelectorAll('.item__price');
  adPrices.forEach(price => price.innerText = `R$${parseFloat(price.innerText).toFixed(2)}`);
}

window.onload = async function onload() {
  updateSumOfPrices();
  const ads = await fetchAds('computador');
  ads.forEach((ad) => {
    const newCard = createProductItemElement(ad);
    document.querySelector('.items').appendChild(newCard);
  });
  formatPrices();
  formatCarousel();
  document.querySelectorAll('.item__add').forEach(item =>
    item.addEventListener('click', addItemToCart));
  if (localStorage.length) loadShoppingCart();
  updateSumOfPrices();
  removeLoader();
};

function hideCart () {
  cartSection.classList.replace('cart__visible', 'cart__hidden');
  document.body.removeChild(document.body.firstChild);
}

function createBluredDiv() {
  const bluredDiv = document.createElement('div');
  bluredDiv.className = 'blured';
  bluredDiv.addEventListener('click', hideCart)
  document.body.prepend(bluredDiv);
}

showCartButton.addEventListener('click', () => {
  createBluredDiv();
  cartSection.classList.replace('cart__hidden', 'cart__visible');
});

closeCartButton.addEventListener('click', hideCart);
