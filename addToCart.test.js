import { expect } from 'chai';

// Simular el localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;
global.alert = () => {};

// Importar la función addToCart
let cart = [];
function addToCart(productId, productName, productPrice) {
  const existingProduct = cart.find((product) => product.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const newProduct = {
      id: productId,
      name: productName,
      price: parseFloat(productPrice.replace('.', '').replace(',', '.')),
      quantity: 1,
    };
    cart.push(newProduct);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Producto agregado al carrito');
}

describe('addToCart', () => {
  beforeEach(() => {
    cart = [];
    localStorage.clear();
  });

  it('should add a new product to the cart', () => {
    addToCart(1, 'Product 1', '1.000,00');

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).to.have.lengthOf(1);
    expect(storedCart[0]).to.include({
      id: 1,
      name: 'Product 1',
      price: 1000.0,
      quantity: 1,
    });
  });

  it('should increase the quantity of an existing product in the cart', () => {
    addToCart(1, 'Product 1', '1.000,00');
    addToCart(1, 'Product 1', '1.000,00');

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).to.have.lengthOf(1);
    expect(storedCart[0]).to.include({
      id: 1,
      name: 'Product 1',
      price: 1000.0,
    });
    expect(storedCart[0].quantity).to.equal(2);
  });
});