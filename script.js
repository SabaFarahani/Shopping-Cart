const cartIcon = document.querySelector("#cart-icon");
const closeIcon = document.querySelector("#close-cart");
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeIcon.addEventListener("click", () => {
  cart.classList.remove("active");
});

//Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //Remove Items from Cart
  const removeButton = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", removeCartItem);
  }

  //Quantity Changes
  const quantityInput = document.getElementsByClassName("input-quantity");
  for (var i = 0; i < quantityInput.length; i++) {
    quantityInput[i].addEventListener("change", quantityChanged);
  }

  //Add to Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener("click", addCartClicked);
  }

  //Buy button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

//Remove Items from Cart
function removeCartItem(e) {
  e.target.parentElement.remove();
  updateTotal();
}

//Quantity Change
function quantityChanged(e) {
  const input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Add to Cart
function addCartClicked(e) {
  var shopProducts = e.target.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  //console.log(title)
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already add this item to cart");
      return;
    }
  }

  var cartBoxContent = `
                      <img src="${productImg}" alt="product" class="cart-img" />
                      <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="input-quantity" />
                      </div>
                      <i class="fa-solid fa-trash cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);

  cartShopBox
    .getElementsByClassName("input-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function buyButtonClicked() {
  alert("Your Order is Placed");
  var cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
}

//Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantityElement = cartBox.getElementsByClassName("input-quantity")[0];
    var quantity = quantityElement.value;

    var integer = Math.round((total * 100) / 100);
    total = integer + price * quantity;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  }
}
