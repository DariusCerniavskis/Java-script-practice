const addBtn = document.getElementById("add-button");
const searchBtn = document.getElementById("search-button");
const estatesWrapper=document.getElementById("card");



// window.location.replace("./addOrSearch/index.html");

// window.location.replace("./inMoreDetail/index.html");

// *************************************************************
// export globals
const typesOfRETempl = ["flat", "homestead", "garden-house"];
const glDataArrayURL = "https://695e14ac2556fd22f6773e58.mockapi.io/";
const glArrayURLprefix = "realEstates";

// -------------------------------------------------------
// export fetch
const getArray = async (fetchLink) => {
    const response = await fetch(fetchLink);

    answer = await response.json();

    return answer;
};

// -----------------------------------------------------
// export function
// 
// 
// 
// 
// **********************************************************
    realEstates=[]

    addObj = {
        typeIndex: 2,
        builtYear: 2012,
        locationIndex: 2,
        price: 25000,

        imagesURL: ["https://aruodas-img.dgn.lt/object_66_129604139/nuotrauka.jpg"],
    };

    realEstates.push(addObj)

// **********************************************************
realEstates.forEach((re) => {
  const card = document.createElement("a");
  card.classList.add("section-wrapper");
  const link = `./inMoreDetale/index.html?id=${re.id}`;
  card.href = link;
  card.style.all="unset"

  const title = document.createElement("h2");
  title.innerText =typesOfRETempl[re.typeIndex];

const image = document.createElement("img");
image.classList.add("class","estateImage")
  image.src = re.imagesURL[0];

  const mainInfoWrapper=document.createElement("div");
  mainInfoWrapper.classList.add("class","main-info-wraprer")

  const priceWrapper=document.createElement("div");
  priceWrapper.classList.add("class","price-wraprer")
const price=document.createElement("h3");
  price.innerText=`Price (€): ${re.price}`;


  const yearWrapper=document.createElement("div");
  yearWrapper.classList.add("class","year-wraprer")
const year=document.createElement("h3");
  year.innerText=`Built year: ${re.builtYear}`;
  
 
 priceWrapper.append(price)
 yearWrapper.append(year)
 mainInfoWrapper.append(priceWrapper,yearWrapper)
 
  card.append(title,image,mainInfoWrapper)

  estatesWrapper.append(card);
});

// const realEstates=buildScreen(glDataArrayURL)








console.log(realEstates)




