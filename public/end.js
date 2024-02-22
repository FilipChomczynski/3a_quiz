if (window.localStorage.getItem("UID") === null || window.localStorage.getItem("username") === null) {
    window.location.href = "/login.html";
}



fetch('/tablica_wynikow.json')
    .then((response) => response.json())
    .then((json) => json.forEach(element => {
        
        document.querySelector(".table").innerHTML += `<div class="row">
                                                        <div class="col-sm table-row">${element.name == window.localStorage.getItem("username") ? element.name: element.name.toUpperCase()}</div>
                                                        <div class="col-sm table-row">${element.points}</div>
                                                    </div>`
    }));