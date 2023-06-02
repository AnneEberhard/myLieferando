function showAccount() {
  document.getElementById("accountContainer").classList.remove("d-none");
  document.getElementById("accountContainer").classList.add("d-flex");
}

function hideAccount() {
  document.getElementById("accountContainer").classList.remove("d-flex");
  document.getElementById("accountContainer").classList.add("d-none");
}

function doNotClose(event) {
  event.stopPropagation();
}