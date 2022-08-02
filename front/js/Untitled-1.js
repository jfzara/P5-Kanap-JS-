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
        let errorMessageFirstName = document.getElementById('firstNameErrorMsg');

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
        let errorMessageLastName = document.getElementById('lastNameErrorMsg');

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
        let errorMessageAdress = document.getElementById('addressErrorMsg');

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
        let errorMessageCity = document.getElementById('cityErrorMsg');

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
        let errorMessageEmail = document.getElementById('emailErrorMsg');

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
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value,
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








