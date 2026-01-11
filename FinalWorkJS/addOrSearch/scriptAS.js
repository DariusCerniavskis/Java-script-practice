// import { addingTempl } from "../utils/globalsConst.js";
// import { addNewElement } from "../utils/fetches.js";
// import { getObjectValues, fillHole } from "../utils/functions.js";

const cancelBtn = document.getElementById("cancelBtn");
const typeComboBtn = document.getElementById("type-combo-btn");
const yearComboBtn = document.getElementById("built-year");
const locationComboBtn = document.getElementById("location-combo-btn");
const inputPrice = document.getElementById("input-price");
const imgURLWrapper = document.getElementById("img-URL-wrapper");
const registerBtn = document.getElementById("register-btn");

// *****************************************************************
// export
// Global variables
const glDataArrayURL = "https://695e14ac2556fd22f6773e58.mockapi.io/";
const glArrayURLprefix = "realEstates";

// ----------------------------------------------------------------
// FETCHES
// -------------------------------------------------------
const addNewElement = async (fetchLink, elementObj) => {
    const response = await fetch(fetchLink, {
        method: "POST",
        body: JSON.stringify(elementObj),
        headers: { "Content-Type": "application/json" },
    });

    // laukiam kol įrašys
    answer = await response.json();

    return answer;
};

// FUNCTIONS
// -------------------------------------------------------------------
const removeLastObject = (objectsArray) => {
    objectsArray[objectsArray.length - 1].remove();
    objectsArray.pop();
    return objectsArray;
};

const getObjectValues = (objectsArray) => {
    const values = [];
    objectsArray.forEach((element) => {
        values.push(element.value);
    });

    console.log(values);

    return values;
};

const fillHole = (objectsArray) => {
    const count = objectsArray.length;

    for (let i = 0; i < count; i++) {
        if (objectsArray[i].value.length) {
            // found hole
            for (let j = i; j < count - 1; j++) {
                objectsArray[j].value = objectsArray[j + 1].value;
            }
            if (count > 1) {
                if (!objectsArray(count - 2).value.length) {
                    // 2 last empty elements
                    removeLastObject(objectsArray);
                }
            }
        }
    }
    return objectsArray;
};

const addNewObj = (objectWrapper, objectsArray, prefix) => {
    const newIndex = objectsArray.length;

    const tempObj = document.createElement("input");
    tempObj.setAttribute("class", prefix);
    console.log(tempObj);

    objectWrapper.append(tempObj);
    objectsArray.push(tempObj);

    console.log(objectsArray);

    return tempObj;
};

const addNewURL = () => {
    console.log("addNewURL");
    console.log(imgURLWrapper);
    console.log(inputURLs);
    const tempNewElement = addNewObj(imgURLWrapper, inputURLs, "image-URL");

    return tempNewElement;
};

const addComboboxEment = (combobox, elementValue) => {
    const tempElement = document.createElement("option");
    tempElement.setAttribute("value", elementValue);
    tempElement.innerText = elementValue;
    combobox.append(tempElement);
};

const addYearList = (max, min) => {
    for (let i = max; i >= min; i--) {
        addComboboxEment(yearComboBtn, i);
    }
};

const addingTempl = {
    id: 0,
    typeIndex: 0,
    locationIndex: 0,
    houseFloorsCount: 5,
    flatFloor: 2,
    roomsNumber: 2,
    sqare: 40,
    price: 70000,
    heatingTypeIndex: 0,
    builtYear: 1985,
    renovationYear: 2020,
    isRenLoanPaidOff: false,
    imagesURL: "",
    sellerEmail: "example@gmail.com",
    countryPhoneCode: "+370",
    sellerPhone: "",
    statusIndex: 0,
    isDeleted: false,
    deleteDate: "",
};

// **********************************************************************

registerBtn.addEventListener("click", async () => {
    console.log(addObj);

    console.log(getObjectValues(inputURLs));

    addObj = {
        typeIndex: typeComboBtn.selectedIndex,
        builtYear: yearComboBtn.value,
        locationIndex: locationComboBtn.selectedIndex,
        price: inputPrice.value,

        imagesURL: getObjectValues(inputURLs),
    };

    console.log(addObj);

    answer = addNewElement(glDataArrayURL + glArrayURLprefix, addObj);

    // const gameRes = await insertNewGame(game);

    // setTimeout(() => {
    //     if (gameRes) {
    //         window.location.replace("../index.html");
    //     }
    // }, 2000);
});

// newElement.addEventListener("focusout", () => {
//     console.log(objectsArray);
//     if (newElement === objectsArray[objectsArray.length - 1]) {
//         // the last URL
//         if (tempElement.value.length) {
//             addNewElement(imgURLWrapper, inputURLs, "image");
//         } else {
//             fillHole(objectsArray);
//         }
//     }
// });

// START
const inputURLs = [];
let addObj = addingTempl;
let answer = "";

addYearList(2026, 1980);
const newURL = addNewURL();

// export const addingObj = {
//     id: 0,
//     typeIndex: 0,
//     locationIndex: 0,
//     houseFloorsCount: 5,
//     flatFloor: 2,
//     roomsNumber: 2,
//     sqare: 40,
//     price: 70000,
//     heatingTypeIndex: 0,
//     builtYear: 1985,
//     renovationYear: 2020,
//     isRenLoanPaidOff: false,
//     imagesURL: [],
//     sellerEmail: "example@gmail.com",
//     countryPhoneCode: "+370",
//     sellerPhone: "",
//     statusIndex: 0,
//     isDeleted: false,
//     deleteDate: "",
// };
