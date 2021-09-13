// load product details 
const loadProducts = () => {
  fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>showProducts(data))  
};


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product)
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div class="single-product-img">
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <P>Ratings: <span style="color:red;">${product.rating.rate}</span> </P>
      <p><span style="color:#191970; font-weight:bold;">${product.rating.count}</span> people rated</p>
    
      <h4>Price: $ ${product.price}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="cart-button buy-now btn">add to cart</button>
      <button id="details-btn" class="btn deatils-button" onclick="singleProduct(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// display cart calculation 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

// input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total =parseFloat( convertedOldPrice + convertPrice);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();


// show products when user click on details button

// load single product
const singleProduct = (id)=>{
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res=>res.json())
  .then(data=>showProduct(data))
}
singleProduct()

// show single product on UI
const showProduct = (data)=>{
  const singleProduct = document.getElementById('single-product');
  singleProduct.textContent="";
  singleProduct.classList.add('p-4')
  const div = document.createElement('div');
  div.classList.add('row');
  div.innerHTML=`
  <div class="col-md-4">
            <img src="${data.image}" width="300px" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.description}</p>
              <h4 class="card-text">Price:  ${data.price}$</h4>
            </div>
          </div>
  `;
  singleProduct.appendChild(div);
}
