const apiUrl = "http://localhost:2000";
const validationArea = document.getElementById("validation-area");
const responseArea = document.getElementById("response-area");
const NaNError = "Please enter a number in the price field";
const dbError = "Error storing data in the database";

document.getElementById("write-btn").onclick = function() {
    let name = document.getElementById("input-name").value;
    let price = document.getElementById("input-price").value;
    price = price.trim();
    if (isNaN(price) || price.length == 0) {
        validationArea.innerHTML = NaNError;
    } else {
        price = parseInt(price);
        validationArea.innerHTML = "";
        let requestObject = {name: name, price: price};
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", apiUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(requestObject));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                responseArea.innerHTML = `${name}:${price} was stored in the DB`;
            } else if (this.readyState == 4 && this.status == 500) {
                responseArea.innerHTML = dbError;
            }
        }
    }
}

    