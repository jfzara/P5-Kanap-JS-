const url = "http://localhost:3000/api/products/";


let cartContent = localStorage.getItem("panier_localStorage");

//Vérification du localstorage
let panier;
if (localStorage.getItem("panier_localStorage") != null) {
    console.log(cartContent);
    panier = JSON.parse(localStorage.getItem("panier_localStorage"));
    console.log(panier);
} else {
    panier = [];
    alert("Votre panier est vide!");
};

//Récupération du local storage
displayLocalStorage();

function displayLocalStorage() {
    for (let i = 0; i < panier.length; i++) {
        fetch(url + panier[i].id)
            .then((resp) => resp.json())
            .then(function (data) {

                //On stocke les propriétés de produit dans des variables pour les afficher 
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
                //On crée les attributs "data-id" et "data-color" avec les éléments du localstorage
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
                quantityInput.value = panier[i].quantity;
                contentSettingsQuantity.appendChild(quantityInput);


                quantityInput.addEventListener('click', modifyQuantity);//"change" fonctionne aussi
                function modifyQuantity(e) {
                    console.log(e);
                    let valueNewQuantity = (e.path[0].value);//propriétés de l'event
                    if (valueNewQuantity != panier[i].quantity && valueNewQuantity <= 100 && valueNewQuantity > 0) {
                        panier[i].quantity = valueNewQuantity;
                        localStorage.setItem("panier_localStorage", JSON.stringify(panier));
                        totalQuantity();
                        totalPrice();
                    } else {
                        alert(`Vous ne pouvez commander qu'un nombre d'articles compris entre 1 et 100`);
                        quantityInput.value == 100;
                    }
                }
                //-----------------------------------Supprimer un article-----------------------------------------------------------------

                //Créer la div 
                let contentSettingsDelete = document.createElement("div");
                contentSettingsDelete.className = "cart__item__content__settings__delete";
                contentSettings.appendChild(contentSettingsDelete);

                //Créer le bouton "Supprimer"
                let deleteItem = document.createElement("p");
                deleteItem.className = "deleteItem";
                deleteItem.innerHTML = "Supprimer";
                contentSettingsDelete.appendChild(deleteItem);

                //Ajouter un Event Listener sur le bouton et lui appliquer la fonction "Supprimer(deleteFromCart)"
                deleteItem.addEventListener('click', deleteFromCart);
                function deleteFromCart() {
                    console.log(panier);
                    let idDuProduitASupprimer = panier[i].id;
                    let couleurDuProduitASupprimer = panier[i].color;
                    //rechercher le produit selectionné dans le LS
                    let produitASplicer = panier.find(
                        (element) => element.id === idDuProduitASupprimer && element.color === couleurDuProduitASupprimer);
                    //retirer le produit trouvé du tableau
                    panier.splice((produitASplicer[i] - 1), 1); //

                    localStorage.setItem("panier_localStorage", JSON.stringify(panier));


                    if (panier.length === 0) {
                        localStorage.clear();
                    }
                    window.location.reload();
                }

                totalQuantity();

            });
    };

};

//Fonction pour avoir le nombre total de produits
function totalQuantity() {
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
async function totalPrice() {
    let itemQuantity = document.getElementsByClassName('itemQuantity');
    let total = 0;

    for (e = 0; e < panier.length; e++) {
        let itemPrice = await fetch(url + panier[e].id)
            .then((resp) => resp.json())
            .then(function (data) {
                return data.price
            })
        total += itemPrice * parseInt(itemQuantity[e].value);
    };
    totalPriceProduct = document.getElementById('totalPrice');
    totalPriceProduct.innerHTML = total;
}
totalPrice();   