// Nova Store Shared E-commerce State & Controller

const PRODUCTS = [
    {
        id: 1,
        name: "Nova Studio ANC Headphones",
        category: "Audio",
        price: 199.99,
        oldPrice: 249.99,
        rating: 4.9,
        reviews: 142,
        badge: "Best Seller",
        tagClass: "popular",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
        description: "Studio-grade acoustic architecture with active noise cancellation and 40h battery endurance."
    },
    {
        id: 2,
        name: "Nova Pulse Smart Watch",
        category: "Wearables",
        price: 149.50,
        oldPrice: 179.00,
        rating: 4.8,
        reviews: 98,
        badge: "New",
        tagClass: "",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
        description: "All-day continuous biometric tracking, AMOLED touch display, and waterproof sapphire glass."
    },
    {
        id: 3,
        name: "Nova Aero Wireless Buds",
        category: "Audio",
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.7,
        reviews: 84,
        badge: "25% OFF",
        tagClass: "sale",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
        description: "Ultra-compact in-ear monitors with transparent audio pass-through and rapid USB-C recharge."
    },
    {
        id: 4,
        name: "Nova Precision Mechanical Keyboard",
        category: "Accessories",
        price: 129.00,
        oldPrice: 159.00,
        rating: 4.9,
        reviews: 210,
        badge: "Top Rated",
        tagClass: "popular",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
        description: "Hot-swappable tactile switches with aircraft aluminum chassis and custom RGB backlighting."
    },
    {
        id: 5,
        name: "Nova 65W GaN Fast Charger",
        category: "Accessories",
        price: 39.99,
        oldPrice: 49.99,
        rating: 4.6,
        reviews: 65,
        badge: "Essential",
        tagClass: "",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
        description: "Compact dual USB-C charging block powering laptops, tablets, and mobile devices safely."
    },
    {
        id: 6,
        name: "Nova SoundFlow 360 Speaker",
        category: "Audio",
        price: 119.00,
        oldPrice: 149.00,
        rating: 4.8,
        reviews: 112,
        badge: "Sale",
        tagClass: "sale",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
        description: "Omnidirectional rich acoustic reproduction with IPX7 water resistance and 18-hour playback."
    },
    {
        id: 7,
        name: "Nova Horizon Smart Sunglasses",
        category: "Wearables",
        price: 179.00,
        oldPrice: 219.00,
        rating: 4.5,
        reviews: 43,
        badge: "Trending",
        tagClass: "popular",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
        description: "Polarized UV400 lenses integrated with micro-speakers and voice assistant controls."
    },
    {
        id: 8,
        name: "Nova Ergonomic Wireless Mouse",
        category: "Accessories",
        price: 59.90,
        oldPrice: 75.00,
        rating: 4.8,
        reviews: 89,
        badge: "Staff Pick",
        tagClass: "",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
        description: "Natural hand posture design with dual connection channels and silent acoustic switches."
    }
];

// Cart state in LocalStorage
let cart = JSON.parse(localStorage.getItem('nova_cart')) || [];

function saveCart() {
    localStorage.setItem('nova_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    showToast(`Added ${product.name} to cart!`);
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
}

function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const badge = document.getElementById('cart-count');
    const itemsCount = document.getElementById('cart-items-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total-amount');
    const listEl = document.getElementById('cart-items-list');

    if (badge) badge.textContent = totalCount;
    if (itemsCount) itemsCount.textContent = totalCount;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

    if (listEl) {
        if (cart.length === 0) {
            listEl.innerHTML = `
                <div class="empty-cart-view">
                    <div class="empty-cart-icon">🛒</div>
                    <h4 style="margin-bottom:0.4rem; color:var(--dark);">Your cart is empty</h4>
                    <p style="font-size:0.85rem;">Discover exceptional tech gear and start adding items.</p>
                </div>
            `;
        } else {
            listEl.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-qty-ctrl">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">&minus;</button>
                            <span style="font-size:0.9rem; font-weight:600;">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">&times;</button>
                </div>
            `).join('');
        }
    }
}

function renderProductCard(p) {
    return `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.badge ? `<span class="product-tag ${p.tagClass}">${p.badge}</span>` : ''}
                <button class="product-wishlist-btn" onclick="showToast('Added to wishlist!')" title="Add to Wishlist">♥</button>
            </div>
            <div class="product-content">
                <div class="product-category">${p.category}</div>
                <h3 class="product-title">${p.name}</h3>
                <div class="product-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-count">${p.rating} (${p.reviews})</span>
                </div>
                <p class="product-desc">${p.description}</p>
                <div class="product-footer">
                    <div class="product-pricing">
                        <span class="current-price">$${p.price.toFixed(2)}</span>
                        ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="btn-add-cart" onclick="addToCart(${p.id})">
                        <span>+</span> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Cart Drawer Toggle Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');

    function openCart() {
        if (drawer) drawer.classList.add('open');
        if (overlay) overlay.classList.add('open');
    }

    function closeCart() {
        if (drawer) drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    if (openBtn) openBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty! Add products first.');
                return;
            }
            closeCart();
            if (checkoutModal) checkoutModal.classList.add('open');
            cart = [];
            saveCart();
        });
    }

    if (closeCheckoutModal) {
        closeCheckoutModal.addEventListener('click', () => {
            if (checkoutModal) checkoutModal.classList.remove('open');
        });
    }

    // Populate Featured Products on Home Page if present
    const featuredContainer = document.getElementById('featured-products-container');
    if (featuredContainer) {
        const featuredList = PRODUCTS.slice(0, 4);
        featuredContainer.innerHTML = featuredList.map(renderProductCard).join('');
    }
});
