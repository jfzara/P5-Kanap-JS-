
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('id');


function showOrderId() {

    console.log(orderId);
    let spanOrderId = document.querySelector("#orderId");
    spanOrderId.innerText = orderId;
    localStorage.clear();

}
showOrderId();