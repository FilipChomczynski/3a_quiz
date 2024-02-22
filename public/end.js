if (window.localStorage.getItem("UID") === null || window.localStorage.getItem("username") === null) {
    window.location.href = "/login.html";
}