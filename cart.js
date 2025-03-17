let cart = [];
let total = 0;

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} x ${item.price} ر.س`;
        cartItems.appendChild(li);
        total += item.quantity * item.price;
    });

    totalElement.textContent = total.toFixed(2);
}

document.querySelectorAll('.btn-plus').forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item');
        const name = productItem.querySelector('h3').textContent;
        const price = parseFloat(productItem.querySelector('.price').textContent);
        const quantityElement = productItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);

        quantity++;
        quantityElement.textContent = quantity;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        updateCart();
    });
});

document.querySelectorAll('.btn-minus').forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item');
        const name = productItem.querySelector('h3').textContent;
        const quantityElement = productItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);

        if (quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                if (quantity === 0) {
                    cart = cart.filter(item => item.name !== name);
                } else {
                    existingItem.quantity = quantity;
                }
            }

            updateCart();
        }
    });
});
// حفظ السلة في localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// تحميل السلة من localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// تحميل السلة عند فتح الصفحة
loadCart();