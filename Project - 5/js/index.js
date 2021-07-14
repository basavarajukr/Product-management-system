let products = [];

let cart = [];


// fetching the data from local storage and if not storing it and fetching it 

if(localStorage.getItem('products')===null){
    localStorage.setItem('products', JSON.stringify(products));
}
else{
    products = JSON.parse(localStorage.getItem('products'));
};

if(localStorage.getItem('cart')===null){
    localStorage.setItem('cart', JSON.stringify(cart));
}
else {
    cart=JSON.parse(localStorage.getItem('cart'));
}


let allFilteredProducts = products;



let productRatingId;
function viewProduct(id) {
    productRatingId = id;
    document.getElementById('modal').style.display="flex";

    let product = products.find((product)=> {
        return product.id===id;
    });

    document.getElementById('singlepro-img').src=product.imageurl;
    document.getElementById('singlepro-name').innerText=product.name;
    document.getElementById('singlepro-price').innerText="$" + product.price;
    document.getElementById('singlepro-category').innerText=product.category;
    document.getElementById('noof-rating').innerText=`( ${product.noofrating} ) Ratings`;

    document.getElementById('gold-star-rate').style.width="0px";

    if(product.noofrating>0) {
        let rating = product.rating/product.noofrating;
        document.getElementById('gold-star-rate').style.width = (rating*20) + "%";
    }

    let side_images=product.side_images.split(",");

    let imageString="";

    side_images.forEach((image,index)=> {
        imageString+=`<img class="side_image" onclick="changeImage('${image}')" src='${image}'/>`
    })

    document.getElementById('side_images').innerHTML=imageString;

}

function changeImage(url) {
    document.getElementById('singlepro-img').src=url;
}


function closeProduct(event) {

    if(event.target.className==="modal"){
    document.getElementById('modal').style.display="none";
    }

}

function clearStar() {
    let stars = document.getElementsByClassName('user-rate');

    for(i=0;i<5;i++){
        stars[i].style.color="gray";
     }
}

function selectRating(rating) {
    clearStar();

    let stars = document.getElementsByClassName('user-rate');


    for(i=0;i<rating;i++){
       stars[i].style.color="gold";
    }
}

function rateProduct(rating) {
    let product = products.find((product)=>product.id===productRatingId);

    product.rating+= rating;
    product.noofrating+=1;

    localStorage.setItem('products',JSON.stringify(products));

    displayProduct(allFilteredProducts);

    if(product.noofrating>0) {
        let rating = product.rating/product.noofrating;
        document.getElementById('gold-star-rate').style.width = (rating*20) + "%";
    }

    document.getElementById('noof-rating').innerText=`( ${product.noofrating} ) Ratings`;


    clearStar();

}

function openFilterPanel(status) {

    let panel = document.getElementById('filterpanel');

    status===true?panel.style.marginLeft=0 : panel.style.marginLeft=-20+'%';
}




let filters= {
    nameFilter:{
        status:false,
        value:""
    },
    minRatingFilter:{
        status:false,
        value: ""
    },
    maxRatingFilter:{
        status:false,
        value: ""
    },
    minPriceFilter:{
        status:false,
        value: ""
    },
    maxPriceFilter:{
        status:false,
        value: ""
    },
}


function search(data,property,value){
    let filteredProducts=data.filter(function(product,index){
        return product[property].toUpperCase().includes(value.toUpperCase());
    })

    return filteredProducts;
}

function searchMinMax(data,property,minValue,maxValue) {
    let filteredProducts=data.filter(function(product,index){

        if(product[property]==='rating') {

            let rating=product[property]/product.noofrating;

            return Number(rating>=Number(minValue)&& Number(rating))<=Number(maxValue);
        }

        return Number(product[property])>=Number(minValue) && Number(product[property])<=Number(maxValue);
    })

    return filteredProducts;
}


function clearFilters() {
    let filters= {
    nameFilter:{
        status:false,
        value:""
    },
    minRatingFilter:{
        status:false,
        value: ""
    },
    maxRatingFilter:{
        status:false,
        value: ""
    },
    minPriceFilter:{
        status:false,
        value: ""
    },
    maxPriceFilter:{
        status:false,
        value: ""
    },
}

displayProduct(products);
document.getElementById('filterform').reset();
}




function filter(filterProperty,value) {

    allFilteredProducts = products;

    if(value!=="") {
        filters[filterProperty].status=true;
        filters[filterProperty].value=value;
    }
    else{
        filters[filterProperty].status=false;
        filters[filterProperty].value="";
    }

    if(filters.nameFilter.status===true) {
        allFilteredProducts=search(allFilteredProducts,'name' ,filters.nameFilter.value);
    }

    if(filters.minRatingFilter.status===true) {
        allFilteredProducts = searchMinMax(allFilteredProducts,'rating',filters.minRatingFilter.value,5);
    }

    if(filters.maxRatingFilter.status===true) {
        allFilteredProducts = searchMinMax(allFilteredProducts,'rating',0,filters.maxRatingFilter.value);
    }

    if(filters.minPriceFilter.status===true) {

        let prices = products.map((product)=> {
            return product.price;
        })
        
        allFilteredProducts = searchMinMax(allFilteredProducts,'price',filters.minPriceFilter.value,Math.max(...prices));
    }

    if(filters.maxPriceFilter.status===true) {
        allFilteredProducts = searchMinMax(allFilteredProducts,'price',1,filters.maxPriceFilter.value);
    }


    displayProduct(allFilteredProducts);

}

function addToCart(id) {

    let checkForProduct=cart.find((product)=>product.id===id);

    if(checkForProduct===undefined) {

        let productToAdd = allFilteredProducts.find((product)=> {
            return product.id===id;
        });
        productToAdd.quantity=1;
        cart.push(productToAdd);
        showToast("Added to cart","success");
        localStorage.setItem('cart',JSON.stringify(cart));
    }else{
        showToast("Already in the cart","error");
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

        const {id,name,price,category,color,rating,imageurl,noofrating} = product;

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
                <button id="addcart" onclick="addToCart('${id}')">
                    Add to cart
                </button>
                <button onclick="viewProduct('${id}')">
                    View Product
                </button>
            </p>
        </div>
    </div>`
    })

    document.getElementById('product_container').innerHTML = productString;
}


displayProduct(allFilteredProducts);