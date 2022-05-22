
const getDataApi = async () => {
  await fetch ('http://localhost:3000/api/products')
  .then ((response) => {
    console.log (response);   
    const  allProducts = response.json(); 
    console.log(allProducts);
  allProducts.then((response) => {
  console.log(response);
  })
  .then(function (responseAPI) {
      const articles = responseAPI; 
      console.log(articles);
      for (let article in articles) {
        let productCard = document.createElement("div");
        document.querySelector(".items").appendChild(productCard);
        productCard.classList.add("product_card");
        document.querySelector(".items").style.border = "thick solid #0000FF";
      }
   
  })
  .catch((err) => console.log(err));
  })
}

  getDataApi();

  





