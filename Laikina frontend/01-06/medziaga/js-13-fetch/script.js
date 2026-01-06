const cocktailWrapper = document.getElementById("cocktail-wrapper");

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((data) => {
    console.log(data);

    return data.json();
  })
  .then((jsonData) => {
    console.log(jsonData.drinks[0]);
    const cocktail = jsonData.drinks[0];

    const title = document.createElement("h1");
    title.innerText = cocktail.strDrink;

    const description = document.createElement("p");
    description.innerText = cocktail.strInstructions;

    const image = document.createElement("img");
    image.src = cocktail.strDrinkThumb;

    cocktailWrapper.append(title);
    cocktailWrapper.append(description);
    cocktailWrapper.append(image);
  });
