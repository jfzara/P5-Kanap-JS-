const url = "http://localhost:3000/api/products/";

// Initialisation de l'URL Parameters
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id');
console.log(productId);
let cartContent = localStorage.getItem("panier_localStorage");

//Vérification du localstorage
let panier;
if (localStorage.getItem("panier_localStorage") != null) {
    console.log(cartContent);
    panier = JSON.parse(localStorage.getItem("panier_localStorage"));
    console.log(panier);
} else {
    panier = [];
};

//Récupération du local storage
getCartContent();

function getCartContent() {
    for (let i = 0; i < panier.length; i++) {
        fetch(url + panier[i].id)
            .then((resp) => resp.json())
            .then(function (data) {

                //Récupération des données d'un produit
                let productName = data.name;
                let productPrice = data.price;
                let productImg = data.imageUrl;
                let productImgAlt = data.altTxt;

                // On crée le container du panier
                const sectionContainerCart = document.getElementById("cart__items");
                let sectionCart = document.createElement("section");
                // On crée l'article 
                let articleCart = document.createElement("article"); 
                articleCart.style.border = "2px solid black";
                articleCart.className = "cart__item";
                //Définition des attributs "data-id" et "data-color" avec les éléments du localstorage
                articleCart.setAttribute('data-id', panier[i].id);
                articleCart.setAttribute('data-color', panier[i].color);
                sectionContainerCart.appendChild(articleCart);


                //Création de la div de l'image dans le HTML et lien avec l'article + définition du nom de la balise
                let imgDiv = document.createElement("div")
                articleCart.appendChild(imgDiv);
                imgDiv.className = "cart__item__img"

                //Création de l'image dans le HTML et lien avec la div image
                let img = document.createElement("img");
                img.src = productImg;
                img.alt = productImgAlt;
                imgDiv.appendChild(img);

                //Création de la div contenant la description et les paramètres et lien avec l'article
                let content = document.createElement("div");
                content.className = "cart__item__content";
                articleCart.appendChild(content);

                //Création de la div contenant la description et lien avec la div parent
                let contentDescription = document.createElement("div");
                contentDescription.className = "cart__item__content__description";
                content.appendChild(contentDescription);

                //Création du h2 contenant le nom du produit et lien avec la div description
                let nomProduit = document.createElement("h2");
                nomProduit.innerHTML = productName;
                contentDescription.appendChild(nomProduit);

                //Création du p contenant le choix de couleur du produit et lien avec la div description
                let couleurProduit = document.createElement("p");
                couleurProduit.innerHTML = panier[i].color;
                contentDescription.appendChild(couleurProduit);

              
                //Création du p contenant le prix du produit et lien avec la div description
                let priceProduit = document.createElement("p");
                priceProduit.innerHTML = productPrice + ' ' + "€";
                contentDescription.appendChild(priceProduit);       


                //Création de la div des paramètres et lien avec la div parent
                let contentSettings = document.createElement("div");
                contentSettings.className = "cart__item__content__settings";
                content.appendChild(contentSettings);

                //Création de la div pour la quantité de produit et lien avec la div des paramètres
                let contentSettingsQuantity = document.createElement("div");
                contentSettingsQuantity.className = "cart__item__content__settings__quantity";
                contentSettings.appendChild(contentSettingsQuantity);

                
                //Création du p contenant la quantité de produit et lien avec la div quantité
                let quantityText = document.createElement("p");
                quantityText.innerHTML = "Qté :";
                contentSettingsQuantity.appendChild(quantityText);


                //Création de l'input quantité de produit et lien avec la div quantité
                let quantityInput = document.createElement("input");
                quantityInput.setAttribute("type", "number");
                quantityInput.className = "itemQuantity";
                quantityInput.name = "itemQuantity";
                quantityInput.min = "1";
                quantityInput.max = "100";
                quantityInput.value = panier[i].quantityKanap; 
                contentSettingsQuantity.appendChild(quantityInput);

//Création d'un eventListener pour changement de la quantité dans la page panier
quantityInput.addEventListener('change', modifyQuantity);
function modifyQuantity (e){
    console.log(e);
    let valueNewQuantity= (e.path[0].value);
    if (valueNewQuantity != panier[i].quantityKanap && valueNewQuantity <=100 && valueNewQuantity > 0){
        panier[i].quantityKanap = valueNewQuantity;
        localStorage.setItem("panier_localStorage", JSON.stringify(panier));
        totalQuantity();
        totalPrice();
    } else {
        alert(`Vous ne pouvez commander qu'un nombre d'article compris entre 1 et 100`);
        quantityInput.value = 100;
    }
}

//Création de la div "Supprimer" et lien avec la div des paramètres
let contentSettingsDelete = document.createElement("div");
contentSettingsDelete.className = "cart__item__content__settings__delete";
contentSettings.appendChild(contentSettingsDelete);
//Création du p pour le "Supprimer" et lien avec la div parent
let deleteItem = document.createElement("p");
deleteItem.className = "deleteItem";
deleteItem.innerHTML = "Supprimer";
contentSettingsDelete.appendChild(deleteItem);

//Fonction pour le bouton supprimer
deleteItem.addEventListener('click', deleteItemFromCart);
function deleteItemFromCart () {
    let idProduitDelete = panier[i].idKanap;
    let colorProduitDelete = panier[i].color;
    panier = panier.filter( a => a.idKanap !== idProduitDelete && a.color !== colorProduitDelete);
    localStorage.setItem("panier_localStorage", JSON.stringify(panier));

    if (panier.length === 0) {
        localStorage.clear();
    }
    window.location.reload();
}

totalQuantity();





        /*
                
         */
            });
    };

};

//Fonction pour avoir le nombre total de produits
function totalQuantity () {
    let quantityItem = document.getElementsByClassName('itemQuantity');
    let number = 0;
    //console.log(quantityItem);
    for (i = 0; i < quantityItem.length; i++) {
    number += parseInt(quantityItem[i].value);
    }
    totalNumber = document.getElementById('totalQuantity');
    totalNumber.innerHTML = number;
    };

 // Fonction pour avoir le prix total 
async function totalPrice () {
    let quantityItem = document.getElementsByClassName('itemQuantity');
    let total = 0;
    
    for (e= 0; e < panier.length; e++) {
    let itemPrice = await fetch (url + panier[e].id)
    .then((resp) => resp.json())
    .then(function(data) {
        return data.price
    })
    total += itemPrice * parseInt(quantityItem[e].value);
    };
    totalPriceProduct = document.getElementById('totalPrice');
    totalPriceProduct.innerHTML = total;
    }
    totalPrice();   
