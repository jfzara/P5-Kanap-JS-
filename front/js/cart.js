const url = "http://localhost:3000/api/products/";

// Initialisation de l'URL Parameters
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id');
console.log(productId)
let cartContent = localStorage.getItem("panier_localStorage");
//Vérification du localstorage
let panier;
    if (localStorage.getItem("panier_localStorage") != null) {
        console.log(cartContent);
        panier = JSON.parse(localStorage.getItem("panier_localStorage"));
    } else {
        panier = [];
    };


//Récupération du local storage
getCartContent();

function getCartContent() {
    for (let i=0; i < panier.length; i++) {
    fetch (url + panier[i].id)
    .then((resp) => resp.json())
    .then(function(data) {
        
        //Récupération des données d'un produit
        let productName = data.name;
        let productPrice = data.price;
        let productImg = data.imageUrl;
        let productImgAlt = data.altTxt;

        //Lien avec la balise "Votre panier"
        let lienArticleCart = document.getElementById('cart__items');

//Création de l'article dans le HTML et lien avec la balise "cart__items"
let articleCart = document.createElement("article");
lienArticleCart.appendChild(articleCart);
articleCart.className = "cart__item";
//Définition des attributs "data-id" et "data-color" avec les éléments du localstorage
articleCart.setAttribute('data-id', panier[i].id);
articleCart.setAttribute('data-color', panier[i].color);

        });
    }

}       
    