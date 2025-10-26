document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    // Product data is now in an array of objects
    const products = [
        {
            id: 1,
            name: 'Wireless Earbuds',
            price: 1999,
            image: 'https://placehold.co/200x150/112240/a8b2d1?text=Earbuds'
        },
        {
            id: 2,
            name: '10,000mAh Power Bank',
            price: 1499,
            image: 'https://placehold.co/200x150/112240/a8b2d1?text=Power+Bank'
        },
        {
            id: 3,
            name: 'Bluetooth Speaker',
            price: 2299,
            image: 'https://placehold.co/200x150/112240/a8b2d1?text=Speaker'
        },
        {
            id: 4,
            name: 'Gaming Mouse',
            price: 2599,
            image: 'https://placehold.co/200x150/112240/a8b2d1?text=Mouse'
        }
    ];

    // Cart array to store items
    let cart = [];

    // --- DOM Elements ---
    const productGrid = document.getElementById('product-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');

    // --- FUNCTIONS ---

    /**
     * Renders all products to the page from the products array.
     */
    function renderProducts() {
        productGrid.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    /**
     * Renders the items in the cart and updates the total price.
     */
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear existing cart items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>₹${item.price.toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        
        // Calculate and display total price
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        cartTotalPriceEl.textContent = totalPrice.toFixed(2);
    }
    
    /**
     * Adds a product to the cart.
     * @param {number} productId The ID of the product to add.
     */
    function addToCart(productId) {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            cart.push(productToAdd);
            renderCart(); // Update the cart display
        }
    }

    // --- EVENT LISTENERS ---

    // Listen for clicks on the product grid
    productGrid.addEventListener('click', (event) => {
        // Check if an "Add to Cart" button was clicked
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });


    // --- INITIALIZATION ---
    renderProducts();
    renderCart();
});