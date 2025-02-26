// Obtener el carrito del localStorage, o inicializar un arreglo vacío si no existe
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar un producto al carrito
function addToCart(productId, productName, productPrice) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(product => product.id === productId);

    if (existingProduct) {
        // Incrementar la cantidad si el producto ya existe en el carrito
        existingProduct.quantity += 1;
    } else {
        // Si no existe, agregar el producto con cantidad inicial de 1
        const newProduct = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace('.', '').replace(',', '.')),
            quantity: 1
        };
        cart.push(newProduct);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}

// Asignar el evento click a los botones de agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(button.getAttribute('data-id'));
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        addToCart(productId, productName, productPrice);
    });
});