const getDataApi = async () => {
  await fetch ('http://localhost:3000/api/products')
  .then ((response) => {
    console.log (response);   
    const  allProducts = response.json(); 
    console.log(allProducts);
  allProducts.then((response) => {
  const articles = response;
  
  for (let article in articles) {
    let productCard = document.createElement("div");
        document.querySelector(".items").appendChild(productCard);
        productCard.classList.add("product_card");
        console.log(articles[article]) ;

    let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = "product.html?id=${articles[article]._id}";
        productLink.classList.add("product_link");

    let productImageDiv = document.createElement("div");
        productLink.appendChild(productImageDiv);
        productImageDiv.classList.add("product__image");

    let productImage = document.createElement("Image");
        productImageDiv.appendChild(productImage);
        productImage.src = articles[article].imageUrl;

    let productInfosDiv = document.createElement("div");
        productLink.appendChild(productInfosDiv);
        productInfosDiv.classList.add("product__infos");

    let productInfosTitle = document.createElement("div");
        productInfosDiv.appendChild(productInfosTitle);
        productInfosTitle.classList.add("product__infos__title");
        productInfosTitle.innerHTML = articles[article].name;

    let productInfoPrice = document.createElement("div");
        productInfosDiv.appendChild(productInfoPrice);
        productInfoPrice.classList.add("product__infos__price");  
        
        articles[article].price = articles[article].price / 100;
        productInfoPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(articles[article].price);    
      }
    
  })
      
  .catch((err) => console.log(err));
  })
}

  getDataApi();