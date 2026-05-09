'use strict';

/* ═══════════════════════════════════════════
   GLOBAL STATE — declared first, strict mode
════════════════════════════════════════════ */
let cart = [];
let currentFilter = 'all';
let currentSearch = '';
let slideIndex = 0;
let slideTimer = null;
let modalProductId = null;
let modalQty = 1;
let toastTimer = null;

/* ═══════════════════════════════════════════
   40 HARDCODED PRODUCTS
════════════════════════════════════════════ */
const PRODUCTS = [
    /* ── BEAUTY (10) ── */
    { id: 1, cat: 'beauty', name: 'Rose Gold Glow Serum', price: 38.99, stock: 15, desc: 'A luxurious vitamin C serum infused with 24k gold particles and hyaluronic acid. Brightens skin and reduces fine lines overnight.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYKyCeC4e0w2kreBbZYJe2W_p5gt2h6Xerw&s' },
    { id: 2, cat: 'beauty', name: 'Velvet Lip Collection', price: 24.50, stock: 22, desc: 'A set of 5 long-lasting matte lip colours. Deeply pigmented, hydrating formula that lasts up to 12 hours without feathering.', img: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, cat: 'beauty', name: 'Midnight Jasmine Perfume', price: 62.00, stock: 8, desc: 'An intoxicating oriental floral fragrance with top notes of bergamot, jasmine heart, and warm sandalwood base. 50ml EDP.', img: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, cat: 'beauty', name: 'Bamboo Charcoal Mask', price: 28.50, stock: 18, desc: 'Deep cleansing mask with activated bamboo charcoal and kaolin clay. Draws out impurities and minimizes pores for a refreshed complexion.', img: 'https://multideal.lk/files/productimages/photo/cdc6b807-8878-462c-966a-bb0fe55cd7b4/large_alibabamainimage0H9b445279044e40edb210a94930f5eec8B.jpg' },
    { id: 5, cat: 'beauty', name: 'Cloud Skin Moisturiser', price: 31.50, stock: 20, desc: 'Lightweight whipped moisturiser with niacinamide, ceramides and aloe vera. Melts into skin instantly leaving a dewy, glass-skin finish.', img: 'https://images.pexels.com/photos/6621459/pexels-photo-6621459.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, cat: 'beauty', name: 'Retinol Night Cream', price: 45.00, stock: 12, desc: 'Advanced retinol complex with peptides and vitamin E. Reduces fine lines and improves skin texture while you sleep.', img: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 7, cat: 'beauty', name: 'Hyaluronic Acid Toner', price: 22.99, stock: 25, desc: 'Hydrating facial toner with 5 types of hyaluronic acid. Balances pH and preps skin for serums and moisturizers.', img: 'https://static.beautytocare.com/media/catalog/product/i/s/isntree-ultra-low-molecular-hyaluronic-acid-toner-300ml.jpg' },
    { id: 8, cat: 'beauty', name: 'Jade Roller & Gua Sha Set', price: 19.99, stock: 30, desc: 'Authentic jade stone facial massage set. Reduces puffiness, improves circulation, and enhances product absorption.', img: 'https://images.pexels.com/photos/5069612/pexels-photo-5069612.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 9, cat: 'beauty', name: 'Vitamin C Brightening Mask', price: 16.50, stock: 35, desc: 'Radiance-boosting sheet mask set (10 pack) with vitamin C and niacinamide. Instant glow in 15 minutes.', img: 'https://images.pexels.com/photos/6621461/pexels-photo-6621461.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 10, cat: 'beauty', name: 'Argan Oil Hair Elixir', price: 34.00, stock: 0, desc: 'Pure Moroccan argan oil infused with vitamin E. Tames frizz, adds shine, and nourishes dry, damaged hair.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnfy9X5fonFacRJAc6LemBO6Wvl9lGpFI9Q&s' },

    /* ── HOME (10) ── */
    { id: 11, cat: 'home', name: 'Linen & Amber Candle', price: 22.00, stock: 30, desc: 'Hand-poured soy wax candle with a 55-hour burn time. Notes of fresh linen, warm amber, and a whisper of vanilla.', img: 'https://m.media-amazon.com/images/I/41LQP7mWgeL.jpg' },
    { id: 12, cat: 'home', name: 'Artisan Ceramic Planter', price: 18.75, stock: 18, desc: 'Handcrafted terracotta planter with a matte white glaze finish. Perfect for succulents, herbs or trailing plants. 14cm diameter.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdu6eIRW-2tUwka7XFV19K_mtUiRLIvBJBQ&s' },
    { id: 13, cat: 'home', name: 'Bouclé Throw Blanket', price: 55.00, stock: 10, desc: 'Ultra-soft 100% cotton bouclé throw in warm oat beige. Oversized at 180x130cm, machine washable. Perfect for a cosy evening.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkElG7_vvegjFnsDLEiA3PbSK7p_eiBbbEw&s' },
    { id: 14, cat: 'home', name: 'Woven Rattan Tray Set', price: 34.00, stock: 16, desc: 'Set of 3 hand-woven rattan trays in graduated sizes. Perfect for organising your coffee table, bedroom dresser or bathroom counter.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3HYMkeeNErYGw5n4H4u2hyg0tkOBSXS-UCw&s' },
    { id: 15, cat: 'home', name: 'Marble & Brass Wall Clock', price: 79.00, stock: 6, desc: 'Minimalist wall clock with a genuine Carrara marble face and slim brass hands. Silent quartz movement. 30cm diameter.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIIC7wZ-2pCkW7JH2AvfWo9mqZzLow8GBsug&s' },
    { id: 16, cat: 'home', name: 'Scented Reed Diffuser', price: 28.50, stock: 22, desc: 'Alcohol-free fragrance diffuser with natural rattan reeds. Notes of sandalwood, bergamot, and white tea. Lasts 3-4 months.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fDGx34umSDMQKcoFWJVLjX11xJXRArREww&s' },
    { id: 17, cat: 'home', name: 'Velvet Cushion Cover Set', price: 24.99, stock: 28, desc: 'Set of 2 luxurious velvet cushion covers in jewel tones. Hidden zip closure, 45x45cm. Insert not included.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmUKRqLw_4Sodldr9H3geLS-gil-UE0mUmw&s' },
    { id: 18, cat: 'home', name: 'Minimalist Table Lamp', price: 65.00, stock: 8, desc: 'Scandinavian-inspired ceramic table lamp with linen shade. Warm LED bulb included. Perfect bedside or desk companion.', img: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 19, cat: 'home', name: 'Macrame Wall Hanging', price: 42.00, stock: 14, desc: 'Hand-knotted cotton macrame wall tapestry. Bohemian design adds texture and warmth to any room. 60x90cm.', img: 'https://media.architecturaldigest.com/photos/61240c1e9e428a79ee6a142b/3:4/w_748%2Cc_limit/il_1588xN.2288265858_qfhw.jpg' },
    { id: 20, cat: 'home', name: 'Glass Terrarium Kit', price: 36.50, stock: 0, desc: 'Geometric glass terrarium with air plants, preserved moss, and decorative stones. Low maintenance living decor.', img: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=600' },

    /* ── FASHION (10) ── */
    { id: 21, cat: 'fashion', name: 'Pearl Drop Earrings', price: 32.00, stock: 25, desc: 'Delicate freshwater pearl drops set in sterling silver with a subtle golden hue. Length 3.2cm. Suitable for sensitive ears.', img: 'https://blingbox.in/cdn/shop/products/beautiful-pearl-drop-earrings-bling-box-jewellery-34608676405484.jpg?v=1661365446' },
    { id: 22, cat: 'fashion', name: 'Silk Scarf — Botanical', price: 48.00, stock: 14, desc: 'Pure silk 90x90cm twill scarf featuring an original hand-drawn botanical print. Wear as a headband, neck scarf or bag accessory.', img: 'https://threestoreydesign.co.uk/cdn/shop/files/Palegreenleaflongsilkscarfscrunched.jpg?v=1745933743&width=1946' },
    { id: 23, cat: 'fashion', name: 'Raffia Sun Hat', price: 29.99, stock: 0, desc: 'Wide-brim raffia hat with a grosgrain ribbon band. Adjustable inner band fits 56-59cm. UV50+ sun protection rating.', img: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 24, cat: 'fashion', name: 'Gold Cuff Bracelet', price: 27.00, stock: 19, desc: 'Open-ended 18k gold-plated cuff bracelet with a hammered texture finish. Adjustable to fit most wrist sizes. Tarnish-resistant.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9h38VuntOfXe4TPL0jrbMGvwOqhtV5yDMBw&s' },
    { id: 25, cat: 'fashion', name: 'Leather Crossbody Bag', price: 89.50, stock: 8, desc: 'Soft genuine leather crossbody bag with adjustable strap and gold-tone hardware. Compact yet spacious with interior zip pocket.', img: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 26, cat: 'fashion', name: 'Cashmere Blend Scarf', price: 58.00, stock: 16, desc: 'Luxuriously soft cashmere-wool blend scarf in classic camel. Oversized at 200x70cm. Timeless winter essential.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR74isZCKL2m-SSQDrioPsAJYJkWs0LjE0-8A&s' },
    { id: 27, cat: 'fashion', name: 'Stacking Ring Set', price: 22.50, stock: 32, desc: 'Set of 5 delicate gold-plated rings in varying textures. Mix and match for a curated look. Adjustable sizing.', img: 'https://vkdesignsjewelry.com/wp-content/uploads/2017/11/stacking-engagement-ring-white-diamonds-ethical-diamonds-canadian-diamonds-yellow-gold-hand-forged-hand-made-custom-unique-portland-made.jpg' },
    { id: 28, cat: 'fashion', name: 'Oversized Sunglasses', price: 44.00, stock: 20, desc: 'Retro-inspired oversized acetate sunglasses with UV400 protection. Includes vegan leather case and cleaning cloth.', img: 'https://img.drz.lazcdn.com/static/lk/p/43d91fe2b7d92fa4bea5094af8807dd1.jpg_720x720q80.jpg' },
    { id: 29, cat: 'fashion', name: 'Leather Gloves', price: 39.99, stock: 12, desc: 'Classic lambskin leather gloves with cashmere lining. Touchscreen compatible fingertips. Available in multiple sizes.', img: 'https://m.media-amazon.com/images/I/61H0wkNio1L._AC_UF894,1000_QL80_.jpg' },
    { id: 30, cat: 'fashion', name: 'Anklet Chain', price: 18.00, stock: 0, desc: 'Delicate 14k gold-plated anklet with tiny star charm. Adjustable length 22-25cm. Water-resistant finish.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHv1gTjBLJ9XUNIOJkn9REUdf1qvwjVWqTw&s' },

    /* ── GOURMET (10) ── */
    { id: 31, cat: 'gourmet', name: 'Artisan Dark Chocolate Box', price: 22.50, stock: 40, desc: 'A curated selection of 16 single-origin dark chocolates from Ecuador, Madagascar and Peru. 72-90% cacao. Gift-boxed beautifully.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdA4iIx5oA5L5bMer7rU-ErYJI07AUHgr40g&s' },
    { id: 32, cat: 'gourmet', name: 'Cold-Pressed Olive Oil Trio', price: 38.00, stock: 24, desc: 'Three 250ml bottles of award-winning extra-virgin olive oils: Arbequina, Koroneiki, and Nocellara del Belice. From family estates.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVM_FGOPS3HZR4o9RDGqwKVydc96MK7vguIg&s' },
    { id: 33, cat: 'gourmet', name: 'Ceremonial Matcha Set', price: 44.00, stock: 17, desc: 'Premium A-grade ceremonial matcha from Uji, Japan. Includes 40g tin, hand-crafted bamboo whisk and ceramic bowl. Earthy & smooth.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6HYJ-R7cqdr9WL-r1nIEInAMxj5mbLySJg&s' },
    { id: 34, cat: 'gourmet', name: 'Wildflower Honey Collection', price: 29.99, stock: 32, desc: 'Set of 4 raw, unfiltered wildflower honeys sourced from lavender fields, forest meadows, orange blossom and manuka orchards.', img: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 35, cat: 'gourmet', name: 'Spice Atlas Gift Set', price: 34.50, stock: 0, desc: 'Eight hand-blended spice mixes from around the world: Ras el Hanout, Dukkah, Zaatar, Berbere and more. Each 60g in a linen pouch.', img: 'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 36, cat: 'gourmet', name: 'Aged Balsamic Vinegar', price: 27.00, stock: 18, desc: '12-year aged balsamic vinegar from Modena, Italy. Rich, complex, and syrupy. Perfect for salads, cheese, and strawberries.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1U7dqXGDJrEiNvpq_CsTHPmFiKAD2wtphw&s' },
    { id: 37, cat: 'gourmet', name: 'Truffle Oil Duo', price: 32.50, stock: 22, desc: 'Set of white truffle oil and black truffle oil (100ml each). Made with real truffle extract. Elevates pasta, risotto, and pizza.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_E9tFZuIDmPu-85Z13N511sqYRL_rDN6Nw&s' },
    { id: 38, cat: 'gourmet', name: 'Gourmet Coffee Sampler', price: 28.99, stock: 26, desc: 'Six 50g bags of single-origin coffee beans from Ethiopia, Colombia, Costa Rica, Sumatra, Kenya, and Guatemala. Roasted to order.', img: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 39, cat: 'gourmet', name: 'Artisan Pasta Collection', price: 21.00, stock: 30, desc: 'Set of 4 bronze-die extruded pasta shapes: radiatori, casarecce, trofie, and paccheri. Made with organic durum wheat.', img: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 40, cat: 'gourmet', name: 'Luxury Tea Chest', price: 49.00, stock: 0, desc: 'Wooden chest with 12 loose-leaf tea varieties: Earl Grey, Darjeeling, Jasmine, Sencha, Oolong, Chamomile, and more. 240g total.', img: 'https://images.pexels.com/photos/734983/pexels-photo-734983.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

/* ═══════════════════════════════════════════
   INIT
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartUI();
    startSlideshow();
    initScrollHeader();
    renderProducts();
});

/* ═══════════════════════════════════════════
   LOCAL STORAGE
════════════════════════════════════════════ */
function saveCart() {
    localStorage.setItem('mn_cart', JSON.stringify(cart));
}

function loadCart() {
    const raw = localStorage.getItem('mn_cart');
    cart = raw ? JSON.parse(raw) : [];
}

/* ═══════════════════════════════════════════
   HERO SLIDESHOW
════════════════════════════════════════════ */
function startSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;

    slideTimer = setInterval(() => {
        slides[slideIndex].classList.remove('active');
        if (dots[slideIndex]) dots[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
        if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    }, 5500);
}

function goSlide(n) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;
    slides[slideIndex].classList.remove('active');
    if (dots[slideIndex]) dots[slideIndex].classList.remove('active');
    slideIndex = n;
    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    clearInterval(slideTimer);
    startSlideshow();
}

/* ═══════════════════════════════════════════
   SCROLL HEADER
════════════════════════════════════════════ */
function initScrollHeader() {
    window.addEventListener('scroll', () => {
        const h = document.getElementById('site-header');
        if (h) h.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ═══════════════════════════════════════════
   SEARCH
════════════════════════════════════════════ */
function toggleSearch() {
    const bar = document.getElementById('search-bar');
    if (!bar) return;
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) {
        document.getElementById('search-input').focus();
    } else {
        document.getElementById('search-input').value = '';
        currentSearch = '';
        renderProducts();
    }
}

function searchProducts() {
    currentSearch = document.getElementById('search-input').value.toLowerCase().trim();
    renderProducts();
}

/* ═══════════════════════════════════════════
   FILTER
════════════════════════════════════════════ */
function filterCat(cat, el) {
    currentFilter = cat;
    currentSearch = '';

    const searchInput = document.getElementById('search-input');
    const searchBar = document.getElementById('search-bar');
    if (searchInput) searchInput.value = '';
    if (searchBar) searchBar.classList.remove('open');

    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active',
            a.textContent.toLowerCase() === cat ||
            (cat === 'all' && a.textContent.toLowerCase() === 'all'));
    });

    renderProducts();
    const sec = document.getElementById('products');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════════════════
   RENDER PRODUCTS
════════════════════════════════════════════ */
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const label = document.getElementById('filter-label');
    const noRes = document.getElementById('no-results');
    if (!grid) return;

    const filtered = PRODUCTS.filter(p => {
        const matchCat = currentFilter === 'all' || p.cat === currentFilter;
        const matchSearch = !currentSearch ||
            p.name.toLowerCase().includes(currentSearch) ||
            p.desc.toLowerCase().includes(currentSearch);
        return matchCat && matchSearch;
    });

    if (label) {
        label.textContent =
            `Showing ${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}` +
            (currentFilter !== 'all' ? ` in ${currentFilter}` : '');
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (noRes) noRes.style.display = 'block';
        return;
    }
    if (noRes) noRes.style.display = 'none';

    grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.04}s" onclick="openProductModal(${p.id})">
      <div class="card-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600'"/>
        <span class="card-cat-badge ${p.cat}">${p.cat}</span>
        <span class="card-stock-tag">${p.stock > 0 ? p.stock + ' left' : 'Out of stock'}</span>
      </div>
      <div class="card-body">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc.substring(0, 82)}…</p>
        <div class="card-footer">
          <span class="card-price">£${p.price.toFixed(2)}</span>
          <button class="card-add" ${p.stock === 0 ? 'disabled' : ''}
            onclick="event.stopPropagation(); addToCart(${p.id}, 1)">
            ${p.stock === 0 ? 'Sold Out' : 'Add to Basket'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════
   PRODUCT MODAL
════════════════════════════════════════════ */
function openProductModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    modalProductId = id;
    modalQty = 1;

    document.getElementById('modal-img').src = p.img;
    const badge = document.getElementById('modal-cat');
    badge.textContent = p.cat;
    badge.className = 'modal-badge ' + p.cat;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-desc').textContent = p.desc;
    document.getElementById('modal-price').textContent = '£' + p.price.toFixed(2);
    document.getElementById('modal-stock').textContent =
        p.stock > 0 ? p.stock + ' in stock' : 'Out of stock';
    document.getElementById('modal-qty').textContent = modalQty;

    const btn = document.getElementById('modal-add-btn');
    btn.disabled = p.stock === 0;
    btn.textContent = p.stock === 0 ? 'Out of Stock' : 'Add to Basket';

    document.getElementById('product-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalBg(e) {
    if (e.target === document.getElementById('product-modal')) closeProductModal();
}

function changeModalQty(delta) {
    const p = PRODUCTS.find(x => x.id === modalProductId);
    if (!p) return;
    modalQty = Math.max(1, Math.min(p.stock, modalQty + delta));
    document.getElementById('modal-qty').textContent = modalQty;
}

function addFromModal() {
    if (!modalProductId) return;
    addToCart(modalProductId, modalQty);
    closeProductModal();
}

/* ═══════════════════════════════════════════
   CART LOGIC
════════════════════════════════════════════ */
function addToCart(id, qty) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p || p.stock === 0) return;

    const existing = cart.find(x => x.id === id);
    if (existing) {
        existing.qty = Math.min(p.stock, existing.qty + qty);
    } else {
        cart.push({ id, qty });
    }
    saveCart();
    updateCartUI();
    showToast(`✓ "${p.name}" added to basket`);

    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.classList.add('pop');
        setTimeout(() => badge.classList.remove('pop'), 300);
    }
}

function removeFromCart(id) {
    cart = cart.filter(x => x.id !== id);
    saveCart();
    updateCartUI();
    renderCartDrawer();
}

function changeCartQty(id, delta) {
    const item = cart.find(x => x.id === id);
    const p = PRODUCTS.find(x => x.id === id);
    if (!item || !p) return;
    item.qty = Math.max(1, Math.min(p.stock, item.qty + delta));
    saveCart();
    updateCartUI();
    renderCartDrawer();
}

function getCartTotal() {
    return cart.reduce((sum, item) => {
        const p = PRODUCTS.find(x => x.id === item.id);
        return sum + (p ? p.price * item.qty : 0);
    }, 0);
}

function getCartCount() {
    return cart.reduce((n, item) => n + item.qty, 0);
}

function updateCartUI() {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = getCartCount();
}

/* ═══════════════════════════════════════════
   CART DRAWER
════════════════════════════════════════════ */
function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('drawer-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
}

function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('drawer-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

function renderCartDrawer() {
    const itemsEl = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    if (!itemsEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="empty-msg">Your basket is empty.</p>';
        if (footerEl) footerEl.style.display = 'none';
        return;
    }

    if (footerEl) footerEl.style.display = 'block';

    itemsEl.innerHTML = cart.map(item => {
        const p = PRODUCTS.find(x => x.id === item.id);
        if (!p) return '';
        return `
      <div class="cart-item">
        <div class="ci-img">
          <img src="${p.img}" alt="${p.name}"
               onerror="this.src='https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600'"/>
        </div>
        <div class="ci-info">
          <span class="ci-name">${p.name}</span>
          <span class="ci-price">£${(p.price * item.qty).toFixed(2)}</span>
          <div class="ci-qty-row">
            <button class="ci-qb" onclick="changeCartQty(${p.id}, -1)">−</button>
            <span class="ci-qn">${item.qty}</span>
            <button class="ci-qb" onclick="changeCartQty(${p.id},  1)">+</button>
          </div>
        </div>
        <button class="ci-rm" onclick="removeFromCart(${p.id})" title="Remove">✕</button>
      </div>`;
    }).join('');

    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = '£' + getCartTotal().toFixed(2);
}

/* ═══════════════════════════════════════════
   CHECKOUT
════════════════════════════════════════════ */
function goToCheckout() {
    if (cart.length === 0) { showToast('Your basket is empty!'); return; }
    closeCart();
    renderSummary();
    showPage('checkout-page');
}

function backToShop() {
    hidePage('checkout-page');
}

function renderSummary() {
    const el = document.getElementById('summary-items');
    if (!el) return;

    el.innerHTML = cart.map(item => {
        const p = PRODUCTS.find(x => x.id === item.id);
        if (!p) return '';
        return `
      <div class="sum-item">
        <img src="${p.img}" alt="${p.name}"
             onerror="this.src='https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600'"/>
        <div class="sum-item-info">
          <div class="sum-item-name">${p.name}</div>
          <div class="sum-item-qty">Qty: ${item.qty}</div>
        </div>
        <span class="sum-item-price">£${(p.price * item.qty).toFixed(2)}</span>
      </div>`;
    }).join('');

    const total = getCartTotal();
    const subEl = document.getElementById('sum-sub');
    const grandEl = document.getElementById('sum-grand');
    if (subEl) subEl.textContent = '£' + total.toFixed(2);
    if (grandEl) grandEl.textContent = '£' + total.toFixed(2);
}

/* ── Card input formatters ── */
function fmtCard(input) {
    const v = input.value.replace(/\D/g, '').slice(0, 16);
    const parts = v.match(/.{1,4}/g);
    input.value = parts ? parts.join(' ') : v;
}

function fmtExp(input) {
    let v = input.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    input.value = v;
}

/* ── Form validation ── */
function validateCheckout() {
    const fields = [
        { id: 'f-fn' }, { id: 'f-ln' }, { id: 'f-email' }, { id: 'f-phone' },
        { id: 'f-addr' }, { id: 'f-city' }, { id: 'f-post' },
        { id: 'f-cn' }, { id: 'f-cnum' }, { id: 'f-exp' }, { id: 'f-cvv' },
    ];

    let valid = true;
    fields.forEach(f => {
        const el = document.getElementById(f.id);
        if (!el) return;
        const empty = !el.value.trim();
        el.classList.toggle('err', empty);
        if (empty) valid = false;
    });

    const email = document.getElementById('f-email');
    if (email && email.value && !email.value.includes('@')) {
        email.classList.add('err');
        valid = false;
    }
    const cnum = document.getElementById('f-cnum');
    if (cnum && cnum.value.replace(/\s/g, '').length < 16) {
        cnum.classList.add('err');
        valid = false;
    }

    if (!valid) showToast('Please fill in all required fields correctly.');
    return valid;
}

/* ═══════════════════════════════════════════
   PLACE ORDER — saves to MySQL via server.js
   POST http://localhost:3000/api/orders
   Expects: { user_id, address, items, subtotal, total_amount, payment_method }
   Returns: { order_id, ref }
════════════════════════════════════════════ */
function placeOrder() {
    if (!validateCheckout()) return;

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token') || '';

    const firstName = document.getElementById('f-fn').value.trim();
    const lastName = document.getElementById('f-ln').value.trim();
    const fullName = firstName + ' ' + lastName;

    const orderPayload = {
        user_id: user ? user.user_id : null,
        address: {
            line: document.getElementById('f-addr').value.trim(),
            city: document.getElementById('f-city').value.trim(),
            postcode: document.getElementById('f-post').value.trim(),
        },
        /* variant_id maps 1-to-1 with our hardcoded product id */
        items: cart.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            return {
                variant_id: item.id,
                name: p.name,
                qty: item.qty,
                price: p.price,
            };
        }),
        subtotal: getCartTotal(),
        total_amount: getCartTotal(),
        payment_method: 'card',
    };

    /* Disable button while request is in flight */
    const btn = document.querySelector('.place-order-btn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Placing Order…';
    }

    fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
            },
            body: JSON.stringify(orderPayload),
        })
        .then(res => {
            if (!res.ok) return res.json().then(d => { throw new Error(d.error || 'Server error'); });
            return res.json();
        })
        .then(data => {
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Place Order →';
            }

            /* Populate confirmation */
            document.getElementById('conf-name').textContent = fullName;
            document.getElementById('conf-ref').textContent = data.ref || ('MN-' + data.order_id);

            document.getElementById('conf-items').innerHTML =
                cart.map(item => {
                    const p = PRODUCTS.find(x => x.id === item.id);
                    return `
          <div class="conf-item">
            <span class="conf-name">${p.name} × ${item.qty}</span>
            <span class="conf-price">£${(p.price * item.qty).toFixed(2)}</span>
          </div>`;
                }).join('') +
                `<div class="conf-item" style="font-weight:600;margin-top:.6rem;
        border-top:1px solid #e8e0d0;padding-top:.6rem">
        <span>Total</span>
        <span>£${getCartTotal().toFixed(2)}</span>
      </div>`;

            /* Clear cart after successful order */
            cart = [];
            saveCart();
            updateCartUI();

            hidePage('checkout-page');
            showPage('confirm-page');
        })
        .catch(err => {
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Place Order →';
            }
            console.error('Order error:', err);
            showToast(err.message || 'Could not connect to server. Is your backend running on port 3000?');
        });
}

function continueShopping() {
    hidePage('confirm-page');
    renderProducts();
}

/* ═══════════════════════════════════════════
   PAGE SHOW / HIDE
════════════════════════════════════════════ */
function showPage(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('open')));
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
}

function hidePage(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    setTimeout(() => { el.style.display = 'none'; }, 300);
    document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════
   TOAST
════════════════════════════════════════════ */
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}