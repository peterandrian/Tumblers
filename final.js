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
    ActPrice = itemPrice.replace(/Rp\.|\D/g, '');
    itemSubtotal = parseInt(ActPrice) * parseFloat(itemQuantity);
  
    let existingProducts = JSON.parse(localStorage.getItem('products')) || [];
  
    const product = {
      img: itemImage,
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
      subtotal: itemSubtotal
    };
  
    existingProducts.push(product);
  
    localStorage.setItem('products', JSON.stringify(existingProducts));
  }
  
  function removeFromCart(event) {
    var removeBtnClicked = event.target;
    var cartItemToRemove = removeBtnClicked.parentElement.parentElement.parentElement;
    cartItemToRemove.remove();
    var productId = cartItemToRemove.dataset.productId;
    var existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    var indexToRemove = existingProducts.findIndex(product => product.id === productId);
  
    if (indexToRemove !== -1) {
      existingProducts.splice(indexToRemove, 1);
  
      localStorage.setItem('products', JSON.stringify(existingProducts));
  
      totalPrice();
    }
  }
  

  function quantityUpdate() {
    const cartSubtotals = document.querySelectorAll('.cart-subtotal');
    for (const cartSubtotal of cartSubtotals) {
      const priceElement = cartSubtotal.parentElement.querySelector('.cart-item-price');
      const price = parseFloat(priceElement.textContent.replace(/Rp\.|\D/g, ''))
      const quantityElement = cartSubtotal.parentElement.querySelector('.cart-quantity');
      const quantity = parseFloat(quantityElement.value);
      const updatedSubtotal = price * quantity;
      cartSubtotal.textContent = "Rp. " + updatedSubtotal.toLocaleString("id-ID", { style: "decimal" });
    }
    totalPrice();
  }

  function totalPrice() {
    var totalPriceElement = document.querySelector('.cart-total-price');
    var totalPrice = 0;

    const cartSubtotals = document.querySelectorAll('.cart-subtotal');
    for (const cartSubtotal of cartSubtotals) {
      const subtotal = parseFloat(cartSubtotal.textContent.replace(/Rp\.|\D/g, ''));
      totalPrice += subtotal;
    }

    totalPriceElement.textContent = "Rp. " + totalPrice.toLocaleString("id-ID", { style: "decimal" });
  }
});
