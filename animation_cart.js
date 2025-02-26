// Recuperar el carrito del localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Seleccionar el contenedor donde se mostrarán los productos del carrito
const cartContainer = document.getElementById('cart-container');
const totalContainer = document.getElementById('total');

// Función para mostrar los productos en el carrito
function displayCart() {
    cartContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar los productos

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío</p>';
        totalContainer.innerHTML = '$0';
        return;
    }

    let total = 0;

    // Recorrer los productos del carrito y mostrarlos en la página
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Unidad: $${product.price.toFixed(2)}</p>
            <div>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>Cantidad: ${product.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(productElement);

        // Sumar al total
        total += product.price * product.quantity;
    });

    // Mostrar el total en la página
    totalContainer.innerHTML = `$${total.toFixed(2)}`;
}

// Función para cambiar la cantidad de productos en el carrito
function changeQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    }
    
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Volver a mostrar el carrito
    displayCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del array

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Volver a mostrar el carrito
    displayCart();
}

// Ejecutar la función para mostrar el carrito cuando la página se carga
document.addEventListener('DOMContentLoaded', displayCart);