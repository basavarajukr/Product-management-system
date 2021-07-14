function toggleAddModal(event) {

    open=true;
    if(event.target.className.includes("closemodal")){
        open=false;
    }
    else{
        open=true;
    }

    let modal = document.getElementById('add_modal');
    open===true?modal.style.display="flex" : modal.style.display="none";
}


let productToUpdate;

function toggleUpdateModal(event,id=null) {

    open=true;
    if(event.target.className.includes("closemodal")){
        open=false;
    }
    else{
        open=true;
    }

    let modal = document.getElementById('update_modal');
    open===true?modal.style.display="flex" : modal.style.display="none";

    if(id!==null) {
        productToUpdate = products.find((product)=>product.id===id);

     document.getElementById('update_name').value= productToUpdate.name;
    document.getElementById('update_price').value = productToUpdate.price ;
    document.getElementById('update_category').value = productToUpdate.category ;
    document.getElementById('update_color').value = productToUpdate.color;
    document.getElementById('update_imageurl').value = productToUpdate.imageurl ;
    document.getElementById('update_sideimage_urls').value = productToUpdate.side_images ;

    }
}


function updateProduct() {


    productToUpdate.name = document.getElementById('update_name').value;
    productToUpdate.price = document.getElementById('update_price').value;
    productToUpdate.category = document.getElementById('update_category').value;
    productToUpdate.color = document.getElementById('update_color').value;
    productToUpdate.imageurl = document.getElementById('update_imageurl').value;
    productToUpdate.side_images = document.getElementById('update_sideimage_urls').value;



    localStorage.setItem('products', JSON.stringify(products))

    displayProduct(products);
}



let products = [];


// fetching the data from local storage and if not storing it and fetching it 

if(localStorage.getItem('products')===null){
    localStorage.setItem('products', JSON.stringify(products));
}
else{
    products = JSON.parse(localStorage.getItem('products'));
};



function addProduct() {

    let product={rating:0,noofrating:0};


    if(localStorage.getItem("productId")==null){
        localStorage.setItem('productId',"1");
        product.id="p1";
    }else{
        let lastId = Number(localStorage.getItem('productId'));

        let newId = lastId+1;
        localStorage.setItem('productId',newId.toString());

        product.id="p"+(newId);
    }


    product.name = document.getElementById('add_name').value;
    product.price = document.getElementById('add_price').value;
    product.category = document.getElementById('add_category').value;
    product.color = document.getElementById('add_color').value;
    product.imageurl = document.getElementById('add_imageurl').value;
    product.side_images = document.getElementById('sideimage-urls').value;



    products.push(product);
    localStorage.setItem('products', JSON.stringify(products))

    displayProduct(products);

    document.getElementById('add_form').reset();
}


function deleteProduct(id){
    let index=products.findIndex((product)=>product.id===id);
    products.splice(index,1);
    displayProduct(products);
    localStorage.setItem('products', JSON.stringify(products));

}


function displayProduct(productArray) {
    let productString = "";

    productArray.forEach(function(product,index) {

        const {id,name,price,category,color,rating} = product;

        productString += `
            <tr>
            <td>${index+1}</td>
            <td>${id}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td>${color}</td>
            <td>${rating}</td>
            <td>
                <button class="btn btn-update update-modal" onclick='toggleUpdateModal(event,"${id}")'>Update </button>
                <button class="btn btn-delete" onclick="deleteProduct('${id}')">Delete </button>

            </td>
            </tr>`
    })

    document.getElementById('data').innerHTML = productString;
}

// general call 
displayProduct(products);