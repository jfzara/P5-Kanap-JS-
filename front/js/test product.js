const url = "http://localhost:3000/api/products/";

//Extraction de l'Id de chaque produit

const queryString = window.location.search;  
console.log(queryString);//affiche une chaîne de caractères sous la forme: "?id=chiffres_de_l'Id"


const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id');//*extraire l'Id du produit à  partir des UrlSearchParams + le stocker dans la variable productId

let productImage = document.createElement('img');

 // Lien avec la page d'accueil et récupération des éléments


async function getInfoProduct () {
await fetch (url + productId )
.then ((response) => response.json())
.then (function(data) {
  console.log (data)

  // Création des propriétés de la balise "image" à partir des données récupérées de l'API
 
  productImage.src = data.imageUrl;
  productImage.alt = data.altTxt;
  document.getElementsByClassName('item__img')[0].appendChild(productImage);


  // Création de la balise "title" à partir des données récupérées de l'API
  let nameProduct = document.getElementById ('title');
  nameProduct.innerHTML = data.name;

  // Création de la balise "price" à partir des données récupérées de l'API
  let priceProduct = document.getElementById ('price');
  priceProduct.innerHTML = data.price;

  // Création de la balise "description" à partir des données récupérées de l'API
  let descriptionProduct = document.getElementById ('description');
  descriptionProduct.innerHTML = data.description;


  // Création de la balise "colors" à partir des données récupérées de l'API
  let colorsProduct = document.getElementById ('colors');

  // Indication du choix de couleurs proposées en option
  for (let i=0; i < data.colors.length; i++) {
      let color = document.createElement('option');
      color.setAttribute ("value", data.colors[i] );
      color.innerHTML = data.colors[i];
      colorsProduct.appendChild(color);
  };
})
const addToCartBtn = document.querySelector("#addToCart");

addToCartBtn.addEventListener("click", (addToCart));

}

 

 //Ajouter un produit dans le panier
 
 function addToCart() {
   //Déclarer les variables de la couleur et de la quantité des canapés choisi
    const selectedColor = document. querySelector("#colors");
    const numberOfProducts = document.querySelector("#quantity");

//si l'utilisateur a choisi au moins un produit et au aussi choisi la couleur....
    if (numberOfProducts.value > 0 && numberOfProducts.value <=100 && numberOfProducts.value != 0 && selectedColor.value != "") { 
     
        //...et si le local Storage contient déja des produits choisis par l'utilisateur 
        if (localStorage.getItem("panier")) {
           
            
            let cartContent = JSON.parse(localStorage.getItem("panier"));
            console.log(cartContent);

            let idKanap = productId;
            let colorKanap = selectedColor.value;
            let qtyKanap = numberOfProducts.value;

            const sameProductFound = cartContent.find(
                (el) => el.idKanap === productId && el.colorKanap === colorKanap);
                
                console.log(sameProductFound);
               
        //
                if (sameProductFound) {
                    console.log("cas 1");
                    console.log("sameProductFound kanap = " + sameProductFound.qtyKanap);
                    console.log("qtykanap = " + qtyKanap);
                    let newQuantite = parseInt(qtyKanap) + parseInt(sameProductFound.qtyKanap);
                    console.log("newQtt est egal a : " + newQuantite);
                    sameProductFound.qtyKanap = newQuantite;
                    localStorage.setItem("panier", JSON.stringify(cartContent));
                    console.log("cartContent egal :");
                    console.log(cartContent);
                    console.log("fin cartContent");
                //Si le produit commandé n'est pas dans le panier
                } else {
                    console.log("cas 2");
                    let cartContent = JSON.parse(localStorage.getItem("panier"));

                    let idKanap = productId;
                    let nameKanap = document.querySelector("#title").textContent;
                    let colorKanap = document.querySelector("#colors").value;
                    let qtyKanap = document.querySelector("#quantity").value;
                    let imgKanap = productImage.src; 
                    let altImg = productImage.altTxt;
                    let priceKanap = document.querySelector("#price").textContent;
                    
                    console.log(img);
                    console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
                
                    let newProductAdded = {
                        idKanap : productId,
                        nameKanap : nameKanap,
                        colorKanap : colorKanap,
                        qtyKanap  : qtyKanap,
                        imgKanap : imgKanap,
                        altImg : altImg,
                        priceKanap : priceKanap
                    };
                
                    cartContent.push(newProductAdded);
                
                    let nouveauPanier = JSON.stringify(cartContent);
                    localStorage.setItem("nouveau_panier", nouveauPanier);
                
                    alert("Ajouté au panier !");
                }

        } else {
            console.log("cas 3");
            let cartContent = [];

            let idKanap = productId;
            let nameKanap = document.querySelector("#title").textContent;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;
            let imgKanap = productImage.src; 
            let altImg = productImage.alt;
            let priceKanap = document.querySelector("#price").textContent;
            
            console.log(productImage);
            console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
        
            let firstProduct = {
                idKanap : productId,
                nameKanap : nameKanap,
                colorKanap : colorKanap,
                qtyKanap  : qtyKanap,
                imgKanap : imgKanap,
                altImg : altImg,
                priceKanap : priceKanap
            };
        
            cartContent.push(firstProduct);
        
            let cartWithFirstProduct = JSON.stringify(cartContent);
            console.log(cartWithFirstProduct);
            localStorage.setItem("cartWithFirstProduct", cartWithFirstProduct);
        
            alert("Ajouté au panier !");    
        }
    }
}

getInfoProduct ();