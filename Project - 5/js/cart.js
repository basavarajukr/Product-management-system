let cart = [];

if(localStorage.getItem('cart')===null){
    localStorage.setItem('cart', JSON.stringify(cart));
}
else {
    cart=JSON.parse(localStorage.getItem('cart'));
}


function removeFromProduct(id){
    let index=cart.findIndex((product)=>product.id===id);
    cart.splice(index,1);
    displayProduct(cart);
    showToast("Removed from cart","success");
    localStorage.setItem('cart', JSON.stringify(cart));

}

function changeQuantity(status,id) {

    let product = cart.find((product)=> product.id===id);
    // status=="increase"?product.quantity=Number(product.quantity)+1:product.quantity=Number(product.quantity)-1;
    if(status=="increase"){
        product.quantity=Number(product.quantity)+1;
        displayProduct(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
    }
    else{
        if(product.quantity==1){
            let confirmRemoval=confirm("Are u sure u want to remove it");
            if(confirmRemoval===true){
                showToast("Removed from cart","success");
            removeFromProduct(id);
            }
            
        }
        else{
            product.quantity=Number(product.quantity)-1;
            displayProduct(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    


}

function showToast(msg,type) {

    let toast = document.getElementById('toast');
    document.getElementById('toast').innerHTML = `<p style='padding:10px'>${msg}</p>`;
        document.getElementById('toast').style.display= "flex";

        if(type=="success"){
            toast.style.backgroundColor = "#7bce95";
            toast.style.color = "#097129";
        }
        else if(type=="error"){
            toast.style.backgroundColor = "#ea797e";
            toast.style.color = "#bb070f";
        }
        setTimeout(function(){
            toast.style.display="none";
        },10000)
}

function hideToast() {
    document.getElementById('toast').style.display = "none";
}


function displayProduct(productArray) {
    let productString = "";

    productArray.forEach(function(product,index) {

        const {id,name,price,category,color,rating,imageurl,noofrating,quantity} = product;

        productString += `
        <div class="product">
        <div class="pro-img">
            <img src="${imageurl}">
        </div>
        <div class="pro-details">
            <div class="rate-title">
            <h2>${name}</h2>
            <div class="rating">

                <div class="gray-star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                </div>

                <div class="golden-star" style="width:${noofrating>0?(rating/noofrating)*20:0*20}%">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                </div>

              
            </div>
            </div>

            <h2>$ ${price}</h2>

            <p class="category">${category}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam laboriosam facilis veniam fugiat vero neque ad ullam beatae adipisci dolores similique.</p>
            <p>

            <div class="quantity">
                
                <button class="btn quantity-btn" onclick="changeQuantity('decrease','${id}')">-</button>
                <span>${quantity}</span>
                <button class="btn quantity-btn" onclick="changeQuantity('increase','${id}')">+</button>
            
            </div>
                
                <button class="btn" id="addcart" onclick="removeFromProduct('${id}')">
                    Remove From Cart
                </button>
                
            </p>
        </div>
    </div>`
    })

    document.getElementById('product_container').innerHTML = productString;
}

displayProduct(cart);