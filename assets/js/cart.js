document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const checkoutButton = document.querySelector('.btn-control .btn:not(.view-cart)');
    const cartContent = document.querySelector('.minicart-block .cart-content .products');
    const clearCartButton = document.getElementById('clearCartButton'); 

    // 获取购物车数据
    loadCart();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 

            const productItem = this.closest('.sumary-product, .contain-product');
            const productName = productItem.querySelector('.product-title a, .product-attribute .title').textContent;
            const productPrice = productItem.querySelector('.price ins').textContent.replace(/[^\d.]/g, '');
            const productImage = productItem.querySelector('.product-thumb img, .slider-for li img').src;

            const productQtyInput = productItem.querySelector('.qty-input input');
            let productQty = 1;  
            if (productQtyInput && parseInt(productQtyInput.value) > 0) {
                productQty = parseInt(productQtyInput.value);  
            }

            addToCart(productName, productPrice, productImage, productQty);
        });
    });

    //清空键
    clearCartButton.addEventListener('click', function() {
        localStorage.removeItem('cart'); 
        cartContent.innerHTML = ''; 
        updateCartSummary();
        this.disabled = true; 
    });

    function addToCart(name, price, image, qty) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(product => product.name === name);
    
        if (productIndex !== -1) {
            cart[productIndex].quantity += qty;
        } else {
            cart.push({ name, price, image, qty });
        }
    
        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCart(); 
        updateCartSummary(); 
    }

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContent.innerHTML = 'Your cart is empty'; 
        cart.forEach((item, index) => {
            const newCartItem = document.createElement('li');
            newCartItem.innerHTML = createCartItemHTML(item.name, item.price, item.image, item.qty, index);
            cartContent.appendChild(newCartItem);
        });
        attachRemoveEventListeners();
        attachQuantityChangeListeners(); 
        updateCartSummary();
        clearCartButton.disabled = cart.length === 0;
    }
    

    function createCartItemHTML(name, price, image, qty, index) {
        return `
            <div class="minicart-item" data-index="${index}">
                <div class="thumb">
                    <a href="#"><img src="${image}" width="90" height="90" alt="${name}"></a>
                </div>
                <div class="left-info">
                    <div class="product-title"><a href="#" class="product-name">${name}</a></div>
                    <div class="price">
                        <ins><span class="price-amount">$${price}</span></ins>
                    </div>
                    <div class="qty">
                        <label for="qty_${index}">Qty:</label>
                        <input type="number" class="input-qty" name="qty_${index}" id="qty_${index}" value="${qty}" min="1">
                    </div>
                </div>
                <div class="action">
                    <a href="#" class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                    <a href="#" class="remove" data-index="${index}"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                </div>
            </div>
        `;
    }

    function attachQuantityChangeListeners() {
        
        const quantityInputs = document.querySelectorAll('.input-qty');
        quantityInputs.forEach((input, index) => {
            input.addEventListener('change', function() {
                const newQty = parseInt(this.value) || 1;  
                updateCartItemQuantity(index, newQty);
            });
        });
    }
    
    
    function updateCartItemQuantity(index, newQty) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (index >= 0 && index < cart.length && newQty >= 1) {
            cart[index].qty = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); 
            updateCartSummary(); 
        }
    }
    
    function attachRemoveEventListeners() {
        const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1); 
            localStorage.setItem('cart', JSON.stringify(cart)); 
            renderCart(); 
        }
    }
    
    function renderCart() {
        cartContent.innerHTML = ''; 
        loadCart(); 
    }

    function updateCartSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        let totalPrice = 0;
    
        cart.forEach(item => {
            const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            const itemQty = parseInt(item.qty);
            
            if (!isNaN(itemPrice) && !isNaN(itemQty)) {
                totalItems += itemQty;
                totalPrice += itemPrice * itemQty;
            }
        });
    
        document.querySelector('.minicart-block .icon-qty-combine .qty').textContent = totalItems;
        document.querySelector('.minicart-block .sub-total').textContent = `$${totalPrice.toFixed(2)}`;
        checkoutButton.classList.toggle('disabled-link', totalItems === 0);
        clearCartButton.disabled = totalItems === 0; // 更新按钮禁用状态
    }
       
});