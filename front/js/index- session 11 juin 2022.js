//*initialisation de ------*//

        
  const url = 'http://localhost:3000/api/products'  //création variable Url page produit 
        
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  
  const urlProduct = urlParams.get('id');
   
  console.log(url);
  console.log(url + urlProduct);

getInfosProduct (); // Lien avec la page d'accueil et récupération des éléments

async function getInfosProduct () {
await fetch (url + urlProduct)
.then ((response) => response.json())
.then (function(data) {
    console.log (data)

    let img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = data. altTxt;
    document.getElementsByClassName('item_img')[0].appendChild(img);


    let nameProduct = document.getElementById ('title');
    nameProduct.innerHTML = data.name;

    let priceProduct = document.getElementById ('price');
    priceProduct.innerHTML = data.price;

    let descriptionProduct = document.getElementById ('description');
    descriptionProduct.innerHTML = data.description;


    let colorsProduct = document.getElementById ('colors');

    for (let i=0; i < data.colors.length; i++) {
        let color = document.createElement('option')
        color.setAttribute ("value", data.colors [i] );
        color.innerHTML = data.colors [i];
        colorsProduct.appendChild(color);
    };

})

}
/* vérification du local storage

let Kanap_Card; 

if ( localStorage.getItem (Kanap_Card) != null)
*/

