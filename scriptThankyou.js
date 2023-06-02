function showThankYou() {
    document.getElementById("ThankYouContainer").classList.remove("d-none");
    document.getElementById("ThankYouContainer").classList.add("d-flex");
  }
  
  function hideThankYou() {
    document.getElementById("ThankYouContainer").classList.remove("d-flex");
    document.getElementById("ThankYouContainer").classList.add("d-none");
  }