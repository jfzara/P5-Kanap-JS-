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


                quantityInput.addEventListener('change', modifyQuantity);
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
                    panier.splice(produitASplicer[i] - 1, 1); //

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


//Regex pour tester email, prénom-nom-ville et adresse

let emailRegex = new RegExp('^[a-z0-9.-_]+[@]{1}[a-z0-9.-]+[.]{1}[a-z]{2,4}$');
let generalRegex = new RegExp('^[a-zA-Z. àäéèêëîìïôòöûüùç_-]+$');
let adressRegex = new RegExp('^[0-9a-zA-Z.-_ àäéèêëîìïôòöûüùç]+$')

const validFirstName = function (firstName) {
    let testFirstName = generalRegex.test(firstName.value);
    let errorMessageFirstName = document.getElementById('firstNameErrorMsg');

    if (testFirstName) {
        errorMessageFirstName.innerHTML = '';
        return true;
    } else {
        errorMessageFirstName.innerHTML = 'Prénom invalide!';
        return false;
    }
};
const validLastName = function (lastName) {
    let testLastName = generalRegex.test(lastName.value);
    let errorMessageLastName = document.getElementById('lastNameErrorMsg');

    if (testLastName) {
        errorMessageLastName.innerHTML = '';
        return true;
    } else {
        errorMessageLastName.innerHTML = 'Nom invalide!';
        return false;
    }
};
const validAdress = function (address) {
    let testAdress = adressRegex.test(address.value);
    let errorMessageAdress = document.getElementById('addressErrorMsg');

    if (testAdress) {
        errorMessageAdress.innerHTML = '';
        return true;
    } else {
        errorMessageAdress.innerHTML = 'Adresse invalide!';
        return false;
    }
};
const validCity = function (city) {
    let testCity = generalRegex.test(city.value);
    let errorMessageCity = document.getElementById('cityErrorMsg');

    if (testCity) {
        errorMessageCity.innerHTML = '';
        return true;
    } else {
        errorMessageCity.innerHTML = 'Ville invalide!';
        return false;
    }
};
const validEmail = function (email) {
    let testEmail = emailRegex.test(email.value);
    let errorMessageEmail = document.getElementById('emailErrorMsg');

    if (testEmail) {
        errorMessageEmail.innerHTML = '';
        return true;
    } else {
        errorMessageEmail.innerHTML = 'Adresse email invalide!';
        return false;
    }
}

function getForm() {


    // Variable désignant le formulaire
    let form = document.querySelector(".cart__order__form");

    //Vérification des éléments sur le formulaire

    //Prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    //Nom
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });


    //Adresse
    form.address.addEventListener('change', function () {
        validAdress(this);
    });


    //Ville
    form.city.addEventListener('change', function () {
        validCity(this);
    });


    //Adresse mail
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

};

getForm();

// Bouton COMMANDER
const order = document.getElementById('order');

async function submitOrder() {

    //Objet pour les infos du formulaire
    const infoContact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
    };

    //Création d'un array pour les éléments du local storage
    let produitsACommander = [];
    for (let i = 0; i < panier.length; i++) {
        produitsACommander.push(panier[i].id);
    };

    //Mise en place d'un objet pour les avoir les infos contact + les produits
    const infoOrderRecap = {
        products: produitsACommander,
        contact: infoContact,
    };
    console.log(infoOrderRecap)
    let response = await fetch(url + "order", {

        // Ajout de la méthode
        method: "POST",

        // Ajout du body à envoyer
        body: JSON.stringify(infoOrderRecap),

        // Ajout de titre à la requête
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    let dataFromBackEnd = await response.json();
    console.log(dataFromBackEnd);
    orderId = dataFromBackEnd.orderId;
    console.log(orderId);

    document.location.href = 'confirmation.html?id=' + dataFromBackEnd.orderId;
}

order.addEventListener('click', function (event) {
    event.preventDefault();
    if (
        panier.length > 0 &&
        validFirstName(document.getElementById('firstName')) &&
        validLastName(document.getElementById('lastName')) &&
        validAdress(document.getElementById('address')) &&
        validCity(document.getElementById('city')) &&
        validEmail(document.getElementById('email'))) {
        submitOrder();
        //AU CLIC ENVOI SUR LA PAGE CONFIRMATION AVEC L'ORDERID 
        window.location.href = 'confirmation.html?orderId=' + orderId;
    }
    else if (panier === 0) { alert("Panier vide: veuillez choisir au moins un canapé"); }
    else { alert("Veuillez remplir correctement tous les champs"); }
}
);



