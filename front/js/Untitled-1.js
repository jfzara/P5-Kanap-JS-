


//Fonction pour avoir le nombre total de produits
function totalQuantity () {
    let itemQuantity= document.getElementsByClassName('itemQuantity');
    let number = 0;
    //console.log(itemQuantity);
    for (i = 0; i < itemQuantity.length; i++) {
    number += parseInt(itemQuantity[i].valueAsNumber);
    }
    totaQuantityOnPage = document.getElementById('totalQuantity');
    totaQuantityOnPage.innerHTML = number;
    };

 // Fonction pour avoir le prix total 
async function totalPrice () {
    let itemQuantity = document.getElementsByClassName('itemQuantity');
    let total = 0;
    
    for (e= 0; e < panier.length; e++) {
    let itemPrice = await fetch (url + panier[e].id)
    .then((resp) => resp.json())
    .then(function(data) {
        return data.price
    })
    total += itemPrice * parseInt(itemQuantity[e].value);
    };
    totalPriceProduct = document.getElementById('totalPrice');
    totalPriceProduct.innerHTML = total;
    }
    totalPrice();   
   
    function getTotals(){

        // Récupération du total des quantités
        var elemsQtt = document.getElementsByClassName('itemQuantity');
        var myLength = elemsQtt.length,
        totalQtt = 0;
    
        for (var i = 0; i < myLength; ++i) {
            totalQtt += elemsQtt[i].valueAsNumber;
        }
        
        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQtt;
    
        // Récupération du prix total
        totalPrice = 0;
        for (var i = 0; i < myLength; ++i) {
            totalPrice += (elemsQtt[i].valueAsNumber * panier[i].priceKanap);
        }
    
        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
    }




















});
};
}





*/