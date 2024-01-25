// dla klienta (ucznia)
if (window.localStorage.getItem("UID") === null) {
  window.location.href = "/login.html";
}
// generowanie unikalnego ID dla klienta, uid będzie stały.
