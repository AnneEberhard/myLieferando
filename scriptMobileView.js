function writeClickMobileView(total) {
    document.getElementById("clickMobileView").innerHTML = /*html*/ `
      <button onclick="showMobileShoppingBasket()" class=mobileViewButton>Warenkorb (${total} €)</button>`;
  }
  
  
  function showMobileShoppingBasket() {
    document.getElementById("rightSide").classList.add("mobileView");
    document.getElementById("mobileHideShoppingBasket").classList.remove("hide");
  }
  

  function hideMobileShoppingBasket() {
    document.getElementById("rightSide").classList.remove("mobileView");
    document.getElementById("mobileHideShoppingBasket").classList.add("hide");
    writeTotalShoppingBasket();
  }