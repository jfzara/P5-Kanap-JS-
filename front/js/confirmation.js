//on récupere l'id de la commande dans les Url Search Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('id');

//on affiche l'id de la commande
function showOrderId() {

    console.log(orderId);
    let spanOrderId = document.querySelector("#orderId");
    spanOrderId.innerText = orderId;
    localStorage.clear();//on vide le Local Storage

}
showOrderId();//on appelle la fonction