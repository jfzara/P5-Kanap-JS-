const getDataApi = async () => {
    await fetch ('http://localhost:3000/api/products')
    .then ((response) => {
      console.log (response);   
      const  allProducts = response.json(); 
      console.log(allProducts);
    allProducts.then((response) => {
    const articles = response;
    

    for (let article of articles) {
        
        console.log(articles[article]) ;
       

        let productCardAncre = document.createElement("a");
        document.querySelector(".items").appendChild(productCardAncre);
        productCardAncre.classList.add(".card_ancre");
        productCardAncre.innerHTML += ` 
        <a href="./product.html?${article._id}">
          <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3 class="productName">${article.name}</h3>
                <p> ${article.price}€</p>
                <p class="productDescription">${article.description}</p>
          </article>
        </a>
        `;

        };

    })
        
    .catch((err) => console.log(err));
    })
  }
  
    getDataApi();


    