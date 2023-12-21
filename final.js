document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const close = document.getElementById('x-btn');

  burger.addEventListener('click', () => {
    nav.classList.add('active');
  });

  close.addEventListener('click', (event) => {
    event.preventDefault();
    nav.classList.remove('active');
  });

  var addToCartBtnList = document.getElementsByClassName('add-to-cart-btn');
  for (var i = 0; i < addToCartBtnList.length; i++) {
    var addToCartBtn = addToCartBtnList[i];
    addToCartBtn.addEventListener('click', addToCartInputs);
  }

  var removeBtnList = document.getElementsByClassName('btn-remove');
  for (var i = 0; i < removeBtnList.length; i++) {
    var removeBtn = removeBtnList[i];
    removeBtn.addEventListener('click', removeFromCart);
  }

  var quantityBtnList = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityBtnList.length; i++) {
    var quantityBtn = quantityBtnList[i];
    quantityBtn.addEventListener('change', quantityUpdate);
  }

  function addToCartInputs(event) {
    addToCartBtn = event.target;
    shopItem = addToCartBtn.parentElement.parentElement.parentElement;
    itemImage = shopItem.getElementsByClassName('lg-img')[0].src;
    itemName = shopItem.getElementsByClassName('item-name')[0].innerText;
    itemQuantity = shopItem.getElementsByClassName('item-quantity')[0].value;
    itemPrice = shopItem.getElementsByClassName('item-price')[0].innerText;
    addToCart(itemImage, itemName, itemPrice, itemQuantity);
  }

  function addToCart(itemImage, itemName, itemPrice, itemQuantity) {
    const cartItem = {
      name: itemName,
      img: itemImage,
      price: itemPrice,
      quantity: itemQuantity,
      subtotal: calculateSubtotal(itemPrice, itemQuantity),
    };
    let cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const cartItemContainer = document.querySelector('.cart-item');

    if (cartItemContainer) {
      cartItemContainer.innerHTML = ''; 

      cartItems.forEach((cartItem) => {
        const newCartItem = document.createElement('div');
        newCartItem.classList.add('cart-row');
        newCartItem.innerHTML = `
          <div class="cart-box">
            <img src="${cartItem.img}" alt="item-image"> <br>
            <span class="cart-item-title">${cartItem.name}</span>
          </div>
          <div class="cart-box cart-item-price">
            ${cartItem.price}
          </div>
          <div class="cart-box">
            <input type="number" value="${cartItem.quantity}" class="cart-quantity">
          </div>
          <div class="cart-box cart-subtotal">
            ${cartItem.subtotal}
          </div>
          <div class="cart-box">
            <button class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
          </div>
        `;
        cartItemContainer.appendChild(newCartItem);
      });
      totalPrice();
    } else {
      console.error("cartItemContainer not found");
    }
  }

  function removeFromCart(event) {
    var removeBtnClicked = event.target;
    removeBtnClicked.parentElement.parentElement.parentElement.remove();
    totalPrice();
  }

  function quantityUpdate() {
    const cartSubtotals = document.querySelectorAll('.cart-subtotal');
    for (const cartSubtotal of cartSubtotals) {
      const priceElement = cartSubtotal.parentElement.querySelector('.cart-item-price');
      const price = parseFloat(priceElement.textContent.replace("Rp. ", "").replace(".", ""));
      const quantityElement = cartSubtotal.parentElement.querySelector('.cart-quantity');
      const quantity = parseFloat(quantityElement.value);
      const updatedSubtotal = price * quantity;
      cartSubtotal.textContent = "Rp. " + updatedSubtotal.toLocaleString("id-ID", { style: "decimal" });
    }
    totalPrice();
  }

  function calculateSubtotal(price, quantity) {
    return price * quantity;
  }

  function totalPrice() {
    var totalPriceElement = document.querySelector('.cart-total-price');
    var totalPrice = 0;

    const cartSubtotals = document.querySelectorAll('.cart-subtotal');
    for (const cartSubtotal of cartSubtotals) {
      const subtotal = parseFloat(cartSubtotal.textContent.replace("Rp. ", "").replace(".", ""));
      totalPrice += subtotal;
    }

    totalPriceElement.textContent = "Rp. " + totalPrice.toLocaleString("id-ID", { style: "decimal" });
  }
});
