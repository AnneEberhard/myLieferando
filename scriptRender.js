let arrayMenu = [
    {
      popularity: "yes",
      category: "soups",
      title: "Bohnensuppe",
      text: "mit Rindfleisch",
      price: 15.5,
    },
    {
      popularity: "yes",
      category: "salads",
      title: "Bunter Salat",
      text: "mit Hausdressing",
      price: 10.5,
    },
    {
      popularity: "yes",
      category: "schnitzels",
      title: "Wiener Schnitzel",
      text: "mit Kartoffelsalat",
      price: 17.5,
    },
    {
      popularity: "no",
      category: "soups",
      title: "Linsensuppe",
      text: "vegan",
      price: 10.5,
    },
    {
      popularity: "no",
      category: "soups",
      title: "Tomatensuppe",
      text: "mit Croutons",
      price: 17.5,
    },
    {
      popularity: "no",
      category: "salads",
      title: "Griechischer Salat",
      text: "mit Schafskäse",
      price: 11.5,
    },
    {
      popularity: "no",
      category: "salads",
      title: "Tomatensalat",
      text: "mit Mozzarella",
      price: 12.5,
    },
    {
      popularity: "no",
      category: "schnitzels",
      title: "Schweineschnitzel mit Spiegelei",
      text: "mit Bratkartoffeln",
      price: 16.7,
    },
    {
      popularity: "no",
      category: "schnitzels",
      title: "Schweineschnitzel Champignon",
      text: "mit Salzkartoffeln",
      price: 15.5,
    },
  ];

  function render() {
    load();
    let popular = document.getElementById("popular");
    let soup = document.getElementById("soup");
    let salad = document.getElementById("salad");
    let schnitzel = document.getElementById("schnitzel");
    popular.innerHTML = "";
    soup.innerHTML = "";
    salad.innerHTML = "";
    schnitzel.innerHTML = "";
    for (let i = 0; i < arrayMenu.length; i++) {
      const itemMenu = arrayMenu[i];
      if (itemMenu["popularity"] == "yes") {
        renderPopular(i);
      }
      if (itemMenu["category"] == "soups") {
        renderSoup(i);
      }
      if (itemMenu["category"] == "salads") {
        renderSalad(i);
      }
      if (itemMenu["category"] == "schnitzels") {
        renderSchnitzel(i);
      }
    }
    if (names.length == 0) {
      emptyShoppingBasket();
    } else {
      updateShoppingBasket();
    }
  }


function renderPopular(i) {
    let popular = document.getElementById("popular"); //Container to variable
    const itemPopular = arrayMenu[i]; //gets group of variables oot array
    popular.innerHTML += menuItemTemplate(itemPopular, i); //group of variables and index as parameters
  }
  

  function renderSoup(i) {
    let soup = document.getElementById("soup"); //Container to variable
    const itemSoup = arrayMenu[i]; //gets group of variables oot array
    soup.innerHTML += menuItemTemplate(itemSoup, i); //group of variables and index as parameters
  }
  

  function renderSalad(i) {
    let salad = document.getElementById("salad"); //Container to variable
    const itemSalad = arrayMenu[i]; //gets group of variables oot array
    salad.innerHTML += menuItemTemplate(itemSalad, i); //gibt Variablengruppe mit
  }
  
  
  function renderSchnitzel(i) {
    let schnitzel = document.getElementById("schnitzel"); //Container to variable
    const itemSchnitzel = arrayMenu[i]; //gets group of variables oot array
    schnitzel.innerHTML += menuItemTemplate(itemSchnitzel, i); //group of variables and index as parameters
  }
  