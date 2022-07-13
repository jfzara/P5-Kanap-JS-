/*let contenuPanier = JSON.parse(localStorage.getItem("contenu_panier"));

if (!contenuPanier) {
    console.log("test: la fonction est exécutée");
    const titrePanier= document.querySelector("h1");
    const sectionPanier = document.querySelector("cart");

    titrePanier.innerHTML= "Votre panier est vide!";
    
   

} else {
 
    for (let i=0; i < contenuPanier.length; i++) {
console.log("test ok")
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);
    };
} 

       /* // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener("click", (e) => {
            e.preventDefault;
        
            // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = cartContent[i]._id;
            let deleteColor = cartContent[i].colorKanap;

            // filtrer l'élément cliqué par le bouton supprimer
            cartContent = cartContent.filter( elt => elt._id !== deleteId || elt.colorKanap !== deleteColor);

            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem('cart', JSON.stringify(cartContent));               

            // avertir de la suppression et recharger la page
            alert('Votre article a bien été supprimé.');
            
            //Si pas de produits dans le local storage on affiche que le panier est vide
            if (cartContent.length === 0) {
                localStorage.clear();
            }
            //Refresh rapide de la page
            location.reload();
        });
    }
}

function getTotals(){

    // Récupération du total des quantités
    variable 1 = récupérer la value nombre d articles :'itemQuantity';
    myLength = variable1.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('#totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * cartContent[i].priceKanap);
    }

    let productTotalPrice = document.getElementById('#totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals();


function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = cartContent[k].qtyKanap;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = cartContent.find((el) => el.qttModifValue !== quantityModif);

            resultFind.qtyKanap = qttModifValue;
            cartContent[k].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(cartContent));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();


//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

function postForm() {
    const order = document.getElementById('#order');
    order.addEventListener('click', (event) => {
    event.preventDefault();
  
    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName : document.getElementById('#firstName').value,
      lastName : document.getElementById('#lastName').value,
      address : document.getElementById('#address').value,
      city : document.getElementById('#city').value,
      email : document.getElementById('#email').value
    }

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i<cartContent.length;i++) {
        products.push(cartContent[i]._id);
    }
    console.log(products);
  
    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      products,
    }
  
    // j'envoie le formulaire + localStorage (sendFormData) 
    // ... que j'envoie au serveur
  
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };
  
    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
      });
  
  }); // fin eventListener postForm
  } // fin envoi du formulaire postForm
  postForm();
*/

const url = "http://localhost:3000/api/products/";

// Initialisation de l'URL Parameters
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id');


//Vérification du localstorage
let kanap_Cart;
    if (localStorage.getItem('kanap_Cart') != null) {
        console.log("cas1");
        kanap_Cart = JSON.parse(localStorage.getItem('kanap_Cart'));
    } else {
        console.log("cas2");
        kanap_Cart = [];
    };
 
//Récupération du local storage
getProductLocal();

function getProductLocal() {
    for (let i=0; i < kanap_Cart.length; i++) {
    fetch (url + kanap_Cart[i].idKanap)
    .then((resp) => resp.json())
    .then(function(data) {
        
        //Récupération des données d'un produit
        let productName = data.name;
        let productPrice = data.price;
        let productImg = data.imageUrl;
        let productImgAlt = data.altTxt;

        //Lien avec la balise "Votre panier"
        let lienArticleCart = document.getElementById('#cart__items');

        //Création de l'article dans le HTML et lien avec la balise "cart__items"
        let articleCart = document.createElement("article");
        lienArticleCart.appendChild(articleCart);
        articleCart.className = "cart__item";
        //Définition des attributs "data-id" et "data-color" avec les éléments du localstorage
        articleCart.setAttribute('data-id', kanap_Cart[i].idKanap);
        articleCart.setAttribute('data-color', kanap_Cart[i].colorChoiceKanap);

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
        couleurProduit.innerHTML = kanap_Cart[i].colorChoiceKanap;
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
        quantityInput.value = kanap_Cart[i].quantityKanap; 
        contentSettingsQuantity.appendChild(quantityInput);
        //Création d'un eventListener pour changement de la quantité dans la page panier
        quantityInput.addEventListener('change', modifyQuantity);
        function modifyQuantity (e){
            console.log(e);
            let valueNewQuantity= (e.path[0].value);
            if (valueNewQuantity != kanap_Cart[i].quantityKanap && valueNewQuantity <=100 && valueNewQuantity > 0){
                kanap_Cart[i].quantityKanap = valueNewQuantity;
                localStorage.setItem('kanap_Cart', JSON.stringify(kanap_Cart));
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
            let idProduitDelete = kanap_Cart[i].idKanap;
            let colorProduitDelete = kanap_Cart[i].colorChoiceKanap;
            kanap_Cart = kanap_Cart.filter( a => a.idKanap !== idProduitDelete && a.colorChoiceKanap !== colorProduitDelete);
            localStorage.setItem('kanap_Cart', JSON.stringify(kanap_Cart));

            if (kanap_Cart.length === 0) {
                localStorage.clear();
            }
            window.location.reload();
        }

        totalQuantity();
        
    });
};
}


//Fonction pour avoir le nombre total de produits
function totalQuantity () {
    let quantityItem = document.getElementsByClassName('itemQuantity');
    let number = 0;
    //console.log(quantityItem);
    for (i = 0; i < quantityItem.length; i++) {
        number += parseInt(quantityItem[i].value);
    }
    totalNumber = document.getElementById('#totalQuantity');
    totalNumber.innerHTML = number;
};


 // Fonction pour avoir le prix total 
async function totalPrice () {
    let quantityItem = document.getElementsByClassName('#itemQuantity');
    let total = 0;

    for (e= 0; e < kanap_Cart.length; e++) {
        let itemPrice = await fetch (url + kanap_Cart[e].idKanap)
        .then((resp) => resp.json())
        .then(function(data) {
            return data.price
        })
        total += itemPrice * parseInt(quantityItem[e].value);
    };
    totalPriceProduct = document.getElementById('#totalPrice');
    totalPriceProduct.innerHTML = total;
}
totalPrice();


// Formulaire d'information pour le commande
let form = document.getElementsByClassName('cart__order__form')[0];

function setForm () {
    
    let emailRegex = new RegExp('^[a-z0-9.-_]+[@]{1}[a-z0-9.-]+[.]{1}[a-z]{2,4}$');
    let generalRegex = new RegExp('^[a-zA-Z. àäéèêëîìïôòöûüùç_-]+$');
    let adressRegex = new RegExp('^[0-9]{0,5} [a-zA-Z.-_ àäéèêëîìïôòöûüùç]+$')

    //Vérification des éléments sur le formulaire
    
    //Prénom
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    });
    const validFirstName = function(firstName) {
        let testFirstName = generalRegex.test(firstName.value);
        let errorMessageFirstName = document.getElementById('#firstNameErrorMsg');

        if (testFirstName) {
            errorMessageFirstName.innerHTML = 'Prénom valide';
        } else {
            errorMessageFirstName.innerHTML = 'Prénom invalide';
        }
    };

    //Nom
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    });
    const validLastName = function(lastName) {
        let testLastName = generalRegex.test(lastName.value);
        let errorMessageLastName = document.getElementById('#lastNameErrorMsg');

        if (testLastName) {
            errorMessageLastName.innerHTML = 'Nom valide';
        } else {
            errorMessageLastName.innerHTML = 'Nom invalide';
        }
    };

    //Adresse
    form.address.addEventListener('change', function(){
        validAdress(this);
    });
    const validAdress = function(address) {
        let testAdress = adressRegex.test(address.value);
        let errorMessageAdress = document.getElementById('#addressErrorMsg');

        if (testAdress) {
            errorMessageAdress.innerHTML = 'Adresse valide';
        } else {
            errorMessageAdress.innerHTML = 'Adresse invalide'; 
        }
    };

    //Ville
    form.city.addEventListener('change', function(){
        validCity(this);
    });
    const validCity = function(city) {
        let testCity = generalRegex.test(city.value);
        let errorMessageCity = document.getElementById('#cityErrorMsg');

        if (testCity) {
            errorMessageCity.innerHTML = 'Ville valide';
        } else {
            errorMessageCity.innerHTML = 'Ville invalide';
        }
    };

    //Adresse mail
    form.email.addEventListener('change', function(){
        validEmail(this);
    });
    const validEmail = function(email) {
        let testEmail = emailRegex.test(email.value);
        let errorMessageEmail = document.getElementById('#emailErrorMsg');

        if (testEmail) {
            errorMessageEmail.innerHTML = 'Adresse email valide';
        } else {
            errorMessageEmail.innerHTML = 'Adresse email invalide';
        }
    }

};
setForm();

// Bouton COMMANDER
const order = document.getElementById('order');

async function submitOrder (){

    //Mise en place d'un objet pour les infos du formulaire
    const infoContact = {
        firstName : document.getElementById('#firstName').value,
        lastName : document.getElementById('#lastName').value,
        address : document.getElementById('#address').value,
        city : document.getElementById('#city').value,
        email : document.getElementById('#email').value,
    };

    //Création d'un array pour les éléments du local storage
    let panier = [];
    for (let i = 0; i < kanap_Cart.length; i++){
        panier.push(kanap_Cart[i].idKanap);
    };
    
    //Mise en place d'un objet pour les avoir les infos contact + les produits
    const infoOrderRecap = {
        products : panier,
        contact : infoContact,
    };
    console.log(infoOrderRecap)
    let response = await fetch(url + "order", {
 
        // Ajout de la méthode
        method: "POST",
    
        // Ajout du body à envoyer
        body: JSON.stringify(infoOrderRecap),

        // Ajout de titre à la requête
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        let data = await response.json();
        console.log(data)
        orderId = data.orderId
        console.log(orderId)
}

order.addEventListener('click', function(event) {
    event.preventDefault();

    submitOrder();


    //AU CLICK ENVOI SUR LA PAGE CONFIRMATION AVEC L'ORDERID 
    window.location.href = './confirmation.html?orderId=' + orderId;

});