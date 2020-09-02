if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
     
     var heart=document.getElementsByClassName('fa')
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener('click',function(){
            heart[i].classList.toggle("red-heart")
        })
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
     
    var plusQt = document.getElementsByClassName('btn2')
    for (var i = 0; i < plusQt.length; i++) {
        var button = plusQt[i]
        button.addEventListener('click', plusQuantity)
    }

    var moinsQt = document.getElementsByClassName('btn1')
    for (var i = 0; i < moinsQt.length; i++) {
        var button = moinsQt[i]
        button.addEventListener('click', moinsQuantity)
    }
    

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function moinsQuantity(event){
    
    var boutonClique=event.target
    var parent=boutonClique.parentElement
    var QT=parent.getElementsByClassName('cart-quantity-input')[0]
    var sum=parseInt(QT.value);
    if (sum>1
        ){
       QT.value=sum-1 
    }
    
    updateCartTotal()

}
function plusQuantity(event){
    
    var boutonClique=event.target
    var parent=boutonClique.parentElement
    var QT=parent.getElementsByClassName('cart-quantity-input')[0]
    QT.value=parseInt(QT.value)+1
    updateCartTotal()

}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column d-flex justify-content-around">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
            <i class="fa fa-heart"></i>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <button class="btn1">-</button>
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn2">+</button>
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartRow.getElementsByClassName('btn1')[0].addEventListener('click', moinsQuantity)
    cartRow.getElementsByClassName('btn2')[0].addEventListener('click', plusQuantity)

}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}