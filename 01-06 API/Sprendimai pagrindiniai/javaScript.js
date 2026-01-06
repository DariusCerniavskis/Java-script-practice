const cocktailWrapper=document.getElementById("cocktail-wrapper")


fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
.then((cocktails)=>{
    return cocktails.json()
}).then((jsonData)=>{
    console.log(jsonData.drinks[0])

    cocktailData=jsonData.drinks[0]

    const title=document.createElement("h1")
    title.innerText=cocktailData.strDrink

    const discription=document.createElement("p")
    discription.innerText=cocktailData.strInstructions

    const image=document.createElement("img")
    image.src=cocktailData.strDrinkThumb

    const indicator=document.createElement("div")
    indicator.setAttribute("class","indicator")
    indicator.style.backgroundColor=cocktailData.strAlcoholic==="Alcoholic" ?"red": "green"






    cocktailWrapper.append(title)
    cocktailWrapper.append(discription)
    cocktailWrapper.append(image)
    cocktailWrapper.append(indicator)


})


cocktailWrapper.addEventListener("click",()=>{
    console.log(cocktailData.strDrink)
})

fetch('/api/cities/London')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });