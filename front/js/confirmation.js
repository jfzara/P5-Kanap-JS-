

function showOrderId() {

    let yourOrderId = JSON.parse(localStorage.getItem("orderId"));
    console.log(yourOrderId);
    let spanOrderId = document.querySelector("#orderId");
    spanOrderId.innerText = yourOrderId;
    localStorage.clear();

}
showOrderId();