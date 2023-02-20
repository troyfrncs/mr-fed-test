// Fetch the product data from the API
fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product")
.then(response => response.json())
.then(data => {
  console.log(data);
  // Get Product Name, Image, Price, Size Options
  const name = data.title;
  const price = data.price;
  const description = data.description;
  const image = data.imageURL;
  const sizeOptions = data.sizeOptions;

  // Append data to HTML
  productName = document.querySelector("#product-name").append(name);
  productPrice = document.querySelector("#product-price span").append(price);
  productDescrition = document.querySelector("#product-description p").append(description);
  const img = document.createElement("img");
  img.src = image;
  const productImage = document.querySelector("#product-img");
  productImage.appendChild(img);

  // Get product values
  const product = {
    name: name,
    price: price,
    image: image
  };

  const addToCartBtn = document.querySelector("#add-to-cart-btn");
  const miniCartModal = document.querySelector("#mini-cart-modal");
  const sizeList = document.querySelectorAll("#size-list li a");

  sizeList.forEach((sizeOption) => {
    sizeOption.addEventListener("click", () => {
      sizeList.forEach((option) => {
        option.classList.remove("selected");
      });
      sizeOption.classList.add("selected");
    });
  });

  addToCartBtn.addEventListener("click", () => {
    const selectedSizeOption = document.querySelector("#size-list a.selected");
    if (!selectedSizeOption) {
      alert("Please select a size");
      return;
    }
    const size = selectedSizeOption.innerText;


    const productEl = document.createElement("div");
    productEl.innerHTML = `
      <div class="header__cart-row">
        <div class="header__cart-img">
          <img src="${product.image}" alt="${product.name}" width="50">
        </div>
        <div class="header__cart-detail">
          <p class="header__cart-detail-name">${product.name}</p>
          <span class="header__cart-detail-price">1x $<em>${product.price}</em></span>
          <span class="header__cart-detail-size">Size: ${size}</span>
        </div<
      </div>
    `;
    miniCartModal.appendChild(productEl);

    const countEl = document.querySelector("#product-count");
    const count = parseInt(countEl.innerText) + 1;
    countEl.innerText = count.toString();
  });

  // Show Cart when My Cart is clicked
  const myCartBtn = document.querySelector("#my-cart-btn");

  myCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    myCartBtn.classList.toggle('open');
    miniCartModal.classList.toggle('open');
  });
})
.catch(error => {
  console.error(error);
});

