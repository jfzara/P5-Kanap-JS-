//création variable Url page produit
const url = `http://localhost:3000/api/products`; 
console.log(url);

const queryString = window.location.search;  
console.log(queryString);//affiche une chaîne de caractères sous la forme: "?id=chiffres_de_l'Id"



const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const productId = urlParams.get('id');//*extraire l'Id du produit à  partir des UrlSearchParams + le stocker dans la variable productId
console.log(productId);


   
console.log(queryString);


console.log(url);
console.log(productId);


 // Lien avec la page d'accueil et récupération des éléments




async function getInfoProduct () {
await fetch (url + productId )
.then ((response) => response.json())
.then (function(data) {
  console.log (data)

  // Création de la balise "image" à partir des données récupérées de l'API
  let img = document.createElement('img');
  img.src = data.imageUrl;
  img.alt = data. altTxt;
  document.getElementsByClassName('item_img')[0].appendChild(img);


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
      color.setAttribute ("value", data.colors [i] );
      color.innerHTML = data.colors [i];
      colorsProduct.appendChild(color);
  };
})
}

getInfoProduct ();

/* vérification du local storage
let Kanap_Card; 
if ( localStorage.getItem (Kanap_Card) != null)
*/
