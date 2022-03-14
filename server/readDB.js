const apiUrl = "http://localhost:2000";
const displayArea = document.getElementById("read-display");
const xhttp = XMLHttpRequest();

xhttp.open("GET", apiUrl, true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.onreadystatechange == 4 && this.status == 200) {
        let responseObject = JSON.parse(this.responseText);
        responseObject.forEach(element => {
            let rowText = `${element.name}:${element.price}`
            const entry = document.createElement("p");
            entry.innerHTML = rowText;
            displayArea.appendChild(entry);
        });
    }
}
