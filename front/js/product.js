const url = "http://localhost:3000/api/products/";

//Extraction de l'Id de chaque produit

const queryString = window.location.search;  
console.log(queryString);//affiche une chaîne de caractères sous la forme: "?id=chiffres_de_l'Id"


const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id');//*extraire l'Id du produit à  partir des UrlSearchParams + le stocker dans la variable productId





 // Lien avec la page d'accueil et récupération des éléments


async function getInfoProduct () {
await fetch (url + productId )
.then ((response) => response.json())
.then (function(data) {
  console.log (data)

  // Création de la balise "image" à partir des données récupérées de l'API
  let img = document.createElement('img');
  img.src = data.imageUrl;
  img.alt = data.altTxt;
  document.getElementsByClassName('item__img')[0].appendChild(img);


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
      let color = document.createElement('option')
      color.setAttribute ("value", data.colors[i] );
      color.innerHTML = data.colors[i];
      colorsProduct.appendChild(color);
  };
})
}

getInfoProduct ();

// function addNewProduct = Ajout d'article au panier = ajout d'article dans le local Storage;


const addToCartBtn = document.getElementById("#add-to-cart");
const articleQuantity = document.getElementById("#quantity");
const articleColorSelected = document.getElementsByTagName("option").value;

//initialiser une variable (array) pour chaque article ajouté:
const newProductAdded = {
"id": productId,   //l'Id est extrait a partir des UrlSearchParams (variable initialisée en début de la page product.js) 
"color": articleColorSelected,// (variable initialisée en début de la page product.js)
"quantity": articleQuantity, // (variable initialisée en début de la page product.js)
} ;

//initialiser une variable (tableau)pour recevoir tout nouvel article 
let productsInCart = [];

//stocker ce tableau  dans le localStorage en le nommant "panier":  
localStorage.setItem("panier", productsInCart);


/* A chaque clic (Event = click) sur le bouton (EventListener = variable (bouton) addToCartBtn),
exécuter la fonction addNewProduct:*/

addToCartBtn.addEventListener("click", function addNewProduct() {

/*Si le local storage existe
Il contient le panier sous forme d'un tableau nommé "panier" ayant pour valeur productsInCart  
Récupérer le contenu du panier/local storage et le parser pour le manipuler en js sous
forme d'une variable nommée productsSelected */

if (localStorage.getItem("panier") !== null) {

let productsSelected = JSON.parse(localStorage.getItem("panier"));

// Ajouter le nouveau produit dans le tableau et renvoyer le tableau productsSelected dans le local storage

//ajouter le nouveau produit dans le tableau:
productsSelected.push(newProductAdded);
//renvoyer le nouveau tableau dans le local storage 
localStorage.setItem("panier", JSON.stringify(productsSelected));
}

//Si le local storage est vide

else {

//ajouter le nouveau produit dans le tableau productsInCart déclaré plus haut:
productsInCart.push(newProductAdded);
//renvoyer le nouveau tableau dans le local storage 
localStorage.setItem("panier", JSON.stringify(productsInCart));

}

});


