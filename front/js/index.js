const getDataApi = async () => {
    await fetch ('http://localhost:3000/api/products')
    .then ((response) => {
      console.log (response);   
      const  allProducts = response.json(); 
      console.log(allProducts);
    allProducts.then((response) => {
   
      const articles = response;
      
    
    for (let i of articles) {

        let productCardAncre = document.createElement("a");
        document.querySelector(".items").appendChild(productCardAncre);
        productCardAncre.classList.add(".card_ancre");
        productCardAncre.innerHTML += ` 
        <a href="./product.html?${i._id}">
          <article>
                <img src="${i.imageUrl}" alt="${i.altTxt}">
                <h3 class="productName">${i.name}</h3>
                <p> ${i.price}€</p>
                <p class="productDescription">${i.description}</p>
          </article>
        </a>
        `; 

  
    }   
     
    for ( let article of articles) {
  
      console.log(article);
      

      let articlesDataForStorage = JSON.stringify(article);

      let storeData = function () {
        
    
         }
    
       storeData();

        
    }
   
  

  })
  
    .catch((err) => console.log(err));
    })
}
  
    getDataApi();

    
    