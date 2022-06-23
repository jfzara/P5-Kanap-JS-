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

 //Ajouter un produit dans le panier

 function addToCart() {
    //Etablissement du local storage lors du click 'Ajout au panier'
    let kanap_Cart;
    if (localStorage.getItem('kanap_Cart') != null) {
        kanap_Cart = JSON.parse(localStorage.getItem('kanap_Cart'));
    } else {
        kanap_Cart = [];
       // localStorage.setItem('kanap_Cart', []);
    };

        // ******************************** TEST ************************
        fetch (url + productId)
        .then((resp) => resp.json())
        .then(function(data) {
            let productImg = data.imageUrl;
            let productImgAlt = data.altTxt;
            let productName = data.name;
            let productPrice = data.price;
    
        // ******************************** FIN TEST ********************
    
        //Etablissement de la constante du choix de couleurs
        const colorChoice = document.querySelector('#colors');
        //Etablissement de la constante du choix de la quantité
        const quantityChoice = document.querySelector ('#quantity');

        console.log(colorChoice.value==="");
        //Mise en place de la condition où les valeurs color + quantity doivent être établies
        if (quantityChoice.value > 0 && quantityChoice.value <= 100 && colorChoice.value != "") {
        
            let quantityChoiceKanap = parseInt(quantityChoice.value); 
            console.log(quantityChoiceKanap);
            
            let product = {
                'idKanap' : urlProduct,
                'colorChoiceKanap' : colorChoice.value,
                'quantityKanap' : quantityChoiceKanap, 
            }

            let presenceProduit = false;
            let indexProduit = null;
            
            for (i=0; i < kanap_Cart.length; i++){
                if (kanap_Cart[i].idKanap == product.idKanap && kanap_Cart[i].colorChoiceKanap == product.colorChoiceKanap){
                    presenceProduit = true;
                    indexProduit = i;
                }
            }
            if (presenceProduit){
                kanap_Cart[indexProduit].quantityKanap += product.quantityKanap;
            }
            else{
                console.log(kanap_Cart)
                kanap_Cart.push(product);
            };


            localStorage.setItem('kanap_Cart', JSON.stringify(kanap_Cart));

            
        // AU "CLICK", ENVOI SUR LA PAGE PANIER    
        window.location.href = "./cart.html";
        };
        });
}