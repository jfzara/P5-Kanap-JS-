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
  }
  
  })
  
      
      
  .catch((err) => console.log(err));
  })
}

  getDataApi();