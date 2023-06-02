let names = [];
let texts = [];
let prices = [];
let amounts = [];
let remarks = [];


function menuItemTemplate(item, i) {
  //writes the content of the given variable group to HTML
  let priceGerman = numberFormat(item);
  return /*html*/ `
               <div class="menuItem">
                <div class="menuItemTitle">
                  <h3>${item["title"]}
                      <a href=""><img src="./icon/icons8-info-24.png"/></a>
                  </h3>
                  <button id="addButton${i}" class="addButton" onclick="addToShoppingBasket(${i})"> 
                    +
                  </button>
                </div>
                <p class="menuItemText">${item["text"]}</p>
                <div>
                  <h3 class="pricing" id="price1"> ${priceGerman} €</h3>
                </div>
              </div>`;
}


function numberFormat(item) {
  let priceEnglish = item["price"];
  priceGerman = priceEnglish.toFixed(2).replace(".", ",");
  return priceGerman;
}


function addToShoppingBasket(i) {
  let helpArray = arrayMenu[i];
  let name = helpArray["title"];
  let text = helpArray["text"];
  let price = helpArray["price"];
  let index = getMenuIndex(name);
  if (index == -1) {
    names.push(name);
    texts.push(text);
    prices.push(price);
    amounts.push(1);
    remarks.push("");
  } else {
    amounts[index] = amounts[index] + 1;
  }
  save();
  updateShoppingBasket();
}


function getMenuIndex(name) {
  return names.indexOf(name);
}

function updateShoppingBasket() {
  let shoppingBasketTotal = document.getElementById("shoppingBasketTotal");
  let shoppingBasketItems = document.getElementById('shoppingBasketItems');
  shoppingBasketTotal.innerHTML = "";
  shoppingBasketItems.innerHTML = "";
  for (let j = 0; j < names.length; j++) {
    if (remarks[j] == "") {
      shoppingBasketItems.innerHTML += writeItemsShoppingBasket(j);
    } else {
      shoppingBasketItems.innerHTML += writeItemsShoppingBasket(j);
      writeLocalStorageRemark(j);
    }
  }
  shoppingBasketTotal.innerHTML += writeTotalShoppingBasket();
}


function writeItemsShoppingBasket(j) {
  let pricesItem = addPrices(j);
  return /*html*/ `
  <div class="itemShoppingBasket">
    <table>
      <tr>
        <td>${amounts[j]}</td>
        <td class="underlined">${names[j]}</td>
        <td>${pricesItem} €</td>
      </tr>
      <tr>
      <td> </td>
      <td >${texts[j]}</td>
      <td> </td>
    </tr>
    <tr>
    <tr>
    <td> </td>
    </tr>
    <td> </td>
    <td><a class="grey" id="clickRemark${j}" onclick="remark(${j})">Anmerkungen</a></td>
    <td class="buttonsPlusMinus">
      <button onclick="minusOne(${j})" class="addButton">-</button> 
      <button onclick="plusOne(${j})"class="addButton">+</button> 
    </td>
    </tr>
    </table>
    <div class="remark" id="remark${j}"></div>
    <div class="remark" id="remarkLink${j}"></div>
    <div id="remarkInputContainer${j}"></div>
  </div>
  <div class="separator"></div>
  `;
}


function addPrices(i) {
  //CAVE number format
  let sum = 0;
  sum = prices[i] * amounts[i];
  sumGerman = sum.toFixed(2).replace(".", ",");
  return sumGerman;
}


function writeLocalStorageRemark(i) {
  let remark = document.getElementById(`remark${i}`);
  let remarkLink = document.getElementById(`remarkLink${i}`);
  let remarklocalStorageText = remarks[i];
  remark.innerHTML = remarklocalStorageText;
  remarkLink.innerHTML += /*html*/ `<a onclick="changeRemark(${i})">Anmerkung bearbeiten</a>`;
  document.getElementById(`clickRemark${i}`).innerHTML = "";
}


function writeTotalShoppingBasket() {
  let subtotal = addSubtotal();
  let total = addTotal();
  if (subtotal != "0,00") {
    //if not, wrong amount is written in mobile bar
    writeClickMobileView(total);
  } else {
    writeClickMobileView(subtotal);
  }
  return `
  <table class="totalShoppingBasket">
  <tr>
    <td>Zwischensumme</td>
      <td>${subtotal} €</td>
  </tr>
  <tr>
    <td>Lieferkosten</td>
      <td>kostenlos</td>
  </tr>
  <tr>
    <td>Servicegebühr</td>
      <td>0,89 €</td>
  </tr>
  <tr>
    <td>Gesamt</td>
      <td>${total} €</td>
  </tr>
</table>
<button class="payButton" onclick="showThankYou()">Bezahlen (${total} €)</button>
  `;
}


function addTotal() {
  //CAVE number format
  let total = 0.89; //service fee
  for (let i = 0; i < prices.length; i++) {
    sumItem = prices[i] * amounts[i];
    total += sumItem;
  }
  let totalGerman = total.toFixed(2).replace(".", ",");
  return totalGerman;
}


function addSubtotal() {
  //CAVE number format
  let subtotal = 0;
  for (let i = 0; i < prices.length; i++) {
    sumItem = prices[i] * amounts[i];
    subtotal += sumItem;
  }
  let subtotalGerman = subtotal.toFixed(2).replace(".", ",");
  return subtotalGerman;
}


function remark(i) {
  let remarkInputContainer = document.getElementById(
    `remarkInputContainer${i}`
  );
  remarkInputContainer.innerHTML = "";
  remarkInputContainer.innerHTML = /*html*/ `
<input class="remarkInputField" id="remarkInputField${i}" maxlength="160" placeholder="Anmerkungen">
<div class="remarkInputLinks">
    <a onclick="updateShoppingBasket()">Abbrechen</a>
    <a onclick="addRemark(${i})">Hinzufügen</a>
    </div>
`;
  document.getElementById(`clickRemark${i}`).innerHTML = "";
}


function addRemark(i) {
  let remark = document.getElementById(`remark${i}`);
  let remarkLink = document.getElementById(`remarkLink${i}`);
  let remarkInputText = document.getElementById(`remarkInputField${i}`).value;
  if (remarkInputText) {
    remark.innerHTML = remarkInputText;
    remarkLink.innerHTML += /*html*/ `<a onclick="changeRemark(${i})">Anmerkung bearbeiten</a>`;
    document.getElementById(`remarkInputContainer${i}`).innerHTML = "";
  } else {
    updateShoppingBasket();
  }
  remarks.splice(i, 1, remarkInputText);
  save();
}


function changeRemark(i) {
  let remarkToChange = document.getElementById(`remark${i}`).innerHTML; //use innerHTML to get the value
  let remarkLink = document.getElementById(`remarkLink${i}`);
  let remark = document.getElementById(`remark${i}`);
  let remarkInputContainer = document.getElementById(
    `remarkInputContainer${i}`
  );
  remark.innerHTML = "";
  remarkLink.innerHTML = "";
  remarkInputContainer.innerHTML = "";
  remarkInputContainer.innerHTML = /*html*/ `
  <input class="remarkInputField" id="remarkInputField${i}" maxlength="160" value="${remarkToChange}"> <!--writes the old remark-->
  <div class="remarkInputLinks" class="remarkInputButtons">
    <a onclick="deleteRemark(${i})">Löschen</a>
    <a onclick="addRemark(${i})">Speichern</a>
    </div>
`;
  save();
}


function deleteRemark(i) {
  remarks.splice(i, 1, "");
  save();
  updateShoppingBasket();
}


function plusOne(i) {
  amounts[i] = amounts[i] + 1;
  save();
  updateShoppingBasket();
}


function minusOne(i) {
  if (amounts[i] > 1) {
    amounts[i] = amounts[i] - 1;
  } else {
    names.splice(i, 1);
    texts.splice(i, 1);
    prices.splice(i, 1);
    amounts.splice(i, 1);
    remarks.splice(i, 1);
  }
  save();
  let arraylength = names.length;
  if (arraylength == 0) {
    emptyShoppingBasket();
  } else {
    updateShoppingBasket();
  }
}


function emptyShoppingBasket() {
  let subtotal = addSubtotal(); //if not, wrong amount is written in mobile bar
  writeClickMobileView(subtotal);
  let shoppingBasketItems = document.getElementById("shoppingBasketItems");
  let shoppingBasketTotal = document.getElementById("shoppingBasketTotal");
  shoppingBasketTotal.innerHTML ='';
  shoppingBasketItems.innerHTML = `
  <div class="emptyShoppingBasket">
    <img src="./icon/icons8-shopping-bag-64.png">
    <h4>Fülle deinen Warenkorb</h4>
    <p class="center">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
  </div>`;
}


function save() {
  let namesAsText = JSON.stringify(names);
  localStorage.setItem("names", namesAsText);
  let textsAsText = JSON.stringify(texts);
  localStorage.setItem("texts", textsAsText);
  let pricesAsText = JSON.stringify(prices);
  localStorage.setItem("prices", pricesAsText);
  let amountsAsText = JSON.stringify(amounts);
  localStorage.setItem("amounts", amountsAsText);
  let remarksAsText = JSON.stringify(remarks);
  localStorage.setItem("remarks", remarksAsText);
}


function load() {
  let namesAsText = localStorage.getItem("names");
  if (namesAsText) {
    names = JSON.parse(namesAsText);
  }
  let textsAsText = localStorage.getItem("texts");
  if (textsAsText) {
    texts = JSON.parse(textsAsText);
  }
  let pricesAsText = localStorage.getItem("prices");
  if (pricesAsText) {
    prices = JSON.parse(pricesAsText);
  }
  let amountsAsText = localStorage.getItem("amounts");
  if (amountsAsText) {
    amounts = JSON.parse(amountsAsText);
  }
  let remarksAsText = localStorage.getItem("remarks");
  if (remarksAsText) {
    remarks = JSON.parse(remarksAsText);
  }
}