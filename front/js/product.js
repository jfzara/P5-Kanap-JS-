const url = "http://localhost:3000/api/products/";

//Extraction de l'Id de chaque produit

const queryString = window.location.search;  
console.log(queryString);/*affiche une chaîne de caractères sous la forme: "?id=chiffres_de_l'Id"
" const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam'); "- Stack Overflow
*/

const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');//*extraire l'Id du produit à  partir des UrlSearchParams + le stocker dans la variable productId


 // Lien avec la page d'accueil et récupération des éléments

// "pour chaque produit sélectionné exécuter la fonction asynchrone ci-dessous"
async function getInfoProduct () {

// récupérer le bon produit avec l'url de l'API+l'Id du produit en question
await fetch (url + productId )
//traduire la promesse 1 en json
.then ((response) => response.json())

/*les données (data) récupérées dans la promesse 2 servent à afficher chaque propriété du produit
"imageUrl" + "altTxt", "name", "price", "description", "colors".
*/
.then (function(data) {
  console.log (data)

  // Affichage de la balise "image" 
  let img = document.createElement('img');
  img.src = data.imageUrl;
  img.alt = data.altTxt;
  document.getElementsByClassName('item__img')[0].appendChild(img);


  // Affichage de la balise "title" 
  let nameProduct = document.getElementById ('title');
  nameProduct.innerHTML = data.name;

  // Affichage de la balise "price" 
  let priceProduct = document.getElementById ('price');
  priceProduct.innerHTML = data.price;

  // Affichage de la balise "description" 
  let descriptionProduct = document.getElementById ('description');
  descriptionProduct.innerHTML = data.description;


  // Affichage de la balise "colors" 
  let colorsProduct = document.getElementById ('colors');

  // Indication du choix de couleurs proposées en option
  for (let i=0; i < data.colors.length; i++) {
      let color = document.createElement('option')
      color.setAttribute ("value", data.colors[i] );
      color.innerHTML = data.colors[i];
      colorsProduct.appendChild(color);
  };
})
  localStorage.removeItem("kanap_Cart");
// On appelle la fonction addToCart avec un addEventListener sur le bouton (addToCartBtn), qui réagit au clic 
    const addToCartBtn = document.querySelector("#addToCart");
    addToCartBtn.addEventListener("click", (addToCart));
}

 getInfoProduct ();




 function addToCart() {
    // déclarer la variable pour la quantité de produits
    const numberOfProducts = document.querySelector("#quantity");
    // déclarer la variable pour la couleur de produit sélectionnée
    const selectedColor = document.querySelector("#colors");

//`"soit une variable kanap_Car: elle désigne le contenu du panier (ds le localStorage)"
    let kanap_Cart;

// déclarer la condition 
    
    if (/*condotion générale : si le clic ajoute une quantité de produits comprise entre 0 et 100 , non nulle 
    et que l'utilisateur a bien sélectionné une couleur*/
    numberOfProducts.value > 0 && numberOfProducts.value <=100 && numberOfProducts.value != 0 && selectedColor.value != ""
    )
   
    {
    //"cas 1 : si le localStorage contient déja quelque chose"
        if (localStorage.getItem("kanap_Cart") != null) {
            console.log("produit(s) supplémentaire(s) ajouté(s)!");
        //"alors on déclare une variable désignant le contenu du panier ds le localStorage"
        let panier = JSON.parse(localStorage.getItem("kanap_Cart"));
        console.log(panier);
        alert("Ajout supplémentaire dans votre panier!");
    } else {
        //"cas 2: sinon la variable kanap_Cart désignera un tableau vide destiné à recevoir le premier ajout de produit(s)"
        console.log("premier ajout de produit(s)!")
        kanap_Cart = [];
        localStorage.setItem("kanap_Cart", []);//placer ce tableau vide ds le localStorage
        //- récupérer ce tableau vide pour y introduire le premier ajout de produit(s)
        let panier = JSON.parse(localStorage.getItem("kanap_Cart"));
        console.log(panier);
        alert("Ajouté au panier!");
        //-placer le premier ajout de produit(s) sélectionné dans le tableau

    };
}
       
        
}