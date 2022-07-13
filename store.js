if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
var rmBtn = document.getElementsByClassName('btn-danger')
for (var i=0; i<rmBtn.length;i++){
    var btnn= rmBtn[i]
    btnn.addEventListener('click',rmCartitem)
}


var qtyip=document.getElementsByClassName('cart-qty')
for (var i=0; i<qtyip.length;i++){
    var ip=qtyip[i]
    ip.addEventListener('change',qtychange)
}

var addtocartbtns=document.getElementsByClassName('t-primary')
for (var i=0; i<addtocartbtns.length;i++){
    var btnn=addtocartbtns[i]
    btnn.addEventListener('click',addtocartclick)
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTot()
}

function rmCartitem(event){ 
        var btnclick=event.target
        btnclick.parentElement.parentElement.remove()
        updateTot()
}
function qtychange(event){
    var ip=event.target
    if (isNaN(ip.value) || ip.value<=0){
        ip.value=1
    }
    updateTot()
}

function addtocartclick(event){
    var btnn=event.target
    var shopitem=button.parentElement.parentElement
    var title=shopitem.getElementsByClassName('shop-title')[0].innerText
    var price=shopitem.getElementsByClassName('shop-price')[0].innerText
    var imgSrc=shopitem.getElementsByClassName('shop-img')[0].src
    additemtoccart(title,price,imgSrc)
    updateTot()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-t')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-col">
            <img class="cart-img" src="${imageSrc}" width="100" height="100">
            <span class="cart-t">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quant cart-column">
            <input class="cart-quant" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quant')[0].addEventListener('change', quantityChanged)
}


function updateTot(){
    var cartCont=document.getElementsByClassName('cart-items')[0]
    var cartrows=cartCont.getElementsByClassName('cart-row')
    var total=0
    for (var i=0; i<cartrows.length;i++){
        var cartrow=cartrows[i]
        var priceelm=cartrow.getElementsByClassName('cart-price')[0]
        var qtyelm=cartrow.getElementsByClassName('cart-quant')[0]
        var price=parseFloat(priceelm.innerText.replace('$',''))
        var qty=qtyelm.value
        total=total+(price*qty)

    }
    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-tp')[0].innerText='$'+ total
}