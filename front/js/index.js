

//Stocker l'url de l'API dans une constante nommée "url"
const url = 'http://localhost:3000/api/products'


//Affichage des cartes

const getDataApi = async () => {
  await fetch (url)

  //Traduire la promesse 1 en json et la stocker dans la variable allProducts
  .then ((response) => {
    console.log (response);   
    const  allProducts = response.json(); 
    console.log(allProducts);
  
    // Stocker la promesse 2 dans la variable 'articles'   
    allProducts.then((response) => {
  
    const articles = response;

  // puis créer chaque carte avec une boucle FOR, en reprenant la structure HTML proposée
  
  for (let article in articles) {
    let productCard = document.createElement("a");//crée chaque carte (carte = ancre/lien vers page Produit)
        document.querySelector(".items").appendChild(productCard);
        productCard.href = `product.html?id=${articles[article]._id}`;//prise en compte de l'Id du produit concerné

    let productBaliseArticle = document.createElement("article");//contenu de la carte proprement dite
        productCard.appendChild(productBaliseArticle);        

    let productImage = document.createElement("img");
        productBaliseArticle.appendChild(productImage);
        productImage.src = articles[article].imageUrl;//crée l'image de chaque produit
        productImage.style.width = "160px";
        productImage.style.height = "160px";
        productImage.setAttribute("alt",`${articles[article].altTxt}`);

    let productName = document.createElement("h3");
        productName.innerHTML = articles[article].name;//affiche le nom de chaque produit
        productBaliseArticle.appendChild(productName);
        

    let productDescription = document.createElement("p");//affiche la description du produit
        productDescription.innerHTML = articles[article].description; 
        productBaliseArticle.appendChild(productDescription);
         
        
  
      }
    
  })
      
  .catch((err) => console.log(err));
  })//comportement en cas d'échec de la requête
}

  getDataApi();// on appelle la fonction

