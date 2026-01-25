import {
    typesOfRETempl,
    locationsTempl,
    glDataArrayURL,
} from "./utils/globalsConst.js";

import { getArrayFetch } from "./utils/fetches.js";

console.log("Startas")

const tempDeletedWrapper = document.getElementById("temp-deleted");
tempDeletedWrapper.style.display = "none";
const deletedCheck = document.getElementById("check-deleted");
const addBtn = document.getElementById("add-button");
const searchBtn = document.getElementById("search-button");
let estatesWrapper = document.getElementById("card");
searchBtn.style.display = "none";

// window.location.replace("./addOrSearch/index.html");

// window.location.replace("./inMoreDetail/index.html");

const buildEstateList = (isDeleted) => {
    realEstates.forEach((re) => {
        if (isDeleted === re.isDeleted) {
            const card = document.createElement("a");
            // card.classList.add("section-wrapper");
            const link = `./inMoreDetail/index.html?id=${re.id}`;
            card.href = link;

            const title = document.createElement("h2");
            title.innerText = typesOfRETempl[re.typeIndex - 1];

            const image = document.createElement("img");
            image.classList.add("class", "estateImage");
            image.src = re.imagesURL[0];

            const mainInfoWrapper = document.createElement("div");
            mainInfoWrapper.classList.add("class", "main-info-wraprer");

            const priceWrapper = document.createElement("div");
            priceWrapper.classList.add("class", "price-wraprer");
            const price = document.createElement("h3");
            price.innerText = `Price: ${re.price} €`;

            const locationWrapper = document.createElement("div");
            locationWrapper.classList.add("class", "location-wraprer");
            const location = document.createElement("h3");
            location.innerText = `Location: ${
                locationsTempl[re.locationIndex - 1]
            }`;

            priceWrapper.append(price);
            locationWrapper.append(location);
            mainInfoWrapper.append(priceWrapper, locationWrapper);

            card.append(title, image, mainInfoWrapper);

            estateObjects.push(card);

            estatesWrapper.append(card);
        }
    });
};

const buildRealEstates = async (dataURL) => {
    realEstates = await getArrayFetch(dataURL);

    const isSomeDeleted = realEstates.some((re) => {
        return re.isDeleted;
    });

    tempDeletedWrapper.style.display = isSomeDeleted ? "flex" : "none";

    buildEstateList(false);
    deletedCheck.checked = false;
};

deletedCheck.addEventListener("click", () => {
    while (estatesWrapper.firstChild) {
        estatesWrapper.removeChild(estatesWrapper.firstChild);
    }

    buildEstateList(deletedCheck.checked);
});

let realEstates = [];
let estateObjects = [];

buildRealEstates(glDataArrayURL);
