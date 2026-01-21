import {
    typesOfRETempl,
    locationsTempl,
    glDataArrayURL,
    addingTempl,
} from "../utils/globalsConst.js";

// import getObjectValues from "../utils/functions.js";
// import addComboboxEment from "../utils/functions.js";
// import fillCombobox from "../utils/functions.js";
// import numberValidation from "../utils/functions.js";
// import emailValidation from "../utils/functions.js";
// import phoneValidation from "../utils/functions.js";
// import showMessage from "../utils/functions.js";
// import removeEmptyObjects from "../utils/functions.js";
// import fillHoles from "../utils/functions.js";

const confirmationWrapper = document.getElementById("confirmation-wrapper");
const confirmText = document.getElementById("confirm-text");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const cancelBtn = document.getElementById("cancelBtn");
const typeCombobox = document.getElementById("type-combo-btn");
const yearCombobox = document.getElementById("built-year");
const locationCombobox = document.getElementById("location-combo-btn");
const inputPrice = document.getElementById("input-price");
const inputEmail = document.getElementById("input-email");
const inputPhone = document.getElementById("input-phone");

const imgURLWrapper = document.getElementById("img-URL-wrapper");
const registerBtn = document.getElementById("register-btn");
const infoBox = document.getElementById("infoBox");

// *****************************************************************

// FETCHES
// -------------------------------------------------------
const addNewElement = async (fetchLink, elementObj) => {
    try {
        const response = await fetch(fetchLink, {
            method: "POST",
            body: JSON.stringify(elementObj),
            headers: { "Content-Type": "application/json" },
        });

        // laukiam kol įrašys
        answer = await response.json();

        infoBox.innerText = `Real estate was added to list sucsesfully.`;
        infoBox.style.borderColor = "green";
        return answer;
    } catch (err) {
        infoBox.innerText = `Real estate adding failed: ${err}`;
        infoBox.style.borderColor = "red";

        console.error("Update failed:", err);
    }

    infoBox.style.display = "flex";
};

// FUNCTIONS
// -------------------------------------------------------------------
const addComboboxEment = (combobox, elementValue) => {
    const tempElement = document.createElement("option");
    tempElement.setAttribute("value", elementValue);
    tempElement.innerText = elementValue;
    combobox.append(tempElement);
    return;
};

const addNewObj = (objectWrapper, objectsArray, prefix) => {
    const tempObj = document.createElement("input");
    tempObj.setAttribute("class", prefix);

    objectWrapper.append(tempObj);
    objectsArray.push(tempObj);

    return tempObj;
};

const emailValidation = (gotEmail) => {
    if (!gotEmail.length) {
        //Empty
        return "";
    } else {
        const splitedEmail = gotEmail.split("@");

        if (splitedEmail.length !== 2) {
            // No @
            return "";
        } else if (!splitedEmail[0].length || !splitedEmail[1].length) {
            // No user or server
            return "";
        } else if (!splitedEmail[1].includes(".")) {
            // No server dot
            return "";
        }
    }

    return gotEmail.toLowerCase();
};

const fillCombobox = (combobox, array, isDash) => {
    if (isDash) {
        addComboboxEment(combobox, "—");
    }

    array.forEach((element) => {
        addComboboxEment(combobox, element);
    });
};

const getObjectValues = (objectsArray) => {
    const values = [];
    objectsArray.forEach((element) => {
        values.push(element.value);
    });

    console.log(values);

    return values;
};

const numberValidation = (gotValue) => {
    return !isNaN(gotValue) && gotValue !== "";
};

const phoneValidation = (gotPhone) => {
    if (!gotPhone.length) {
        //Empty
        return "";
    } else {
        if (isNaN(gotPhone.slice(1))) {
            // Not numbers
            return "";
        } else {
            const firstDigit = gotPhone.slice(0, 1);

            if (firstDigit !== "+" && firstDigit !== 6) {
                // Bad coubntry code
                return "";
            } else if (firstDigit == 6) {
                if (gotPhone.length !== 8) {
                    // bad lenght
                    return "";
                } else {
                    // Lithuania
                    return `+370${gotPhone}`;
                }
            } else return gotPhone;
        }
    }
};

const showMessage = (messageBox, message, color, isShow) => {
    if (isShow) {
        messageBox.innerText = message;
        messageBox.style.borderColor = color;
    }

    messageBox.style.display = isShow ? "flex" : "none";
};
// -----------------------------------------------------------

const addNewURL = () => {
    const tempNewElement = addNewObj(imgURLWrapper, inputURLs, "image-URL");

    return tempNewElement;
};

const addYearList = (max, min) => {
    addComboboxEment(yearCombobox, "—");
    for (let i = max; i >= min; i--) {
        addComboboxEment(yearCombobox, i);
    }
};

const fillingComboboxes = () => {
    fillCombobox(typeCombobox, typesOfRETempl, true);
    addYearList(2026, 1980);
    fillCombobox(locationCombobox, locationsTempl, true);
};

registerBtn.addEventListener("click", async () => {
    isInvalid = false;
    showMessage(infoBox, "", "", false);
    let temp = "";

    if (!typeCombobox.selectedIndex) {
        // no type
        showMessage(
            infoBox,
            "You do not select real estate type!",
            "red",
            true
        );
        isInvalid = true;
        typeCombobox.style.borderColor = "red";
    } else {
        typeCombobox.style.borderColor = "black";
    }

    if (!yearCombobox.selectedIndex) {
        // no year
        if (!isInvalid) {
            showMessage(infoBox, "You do not select built year!", "red", true);
            isInvalid = true;
        }
        yearCombobox.style.borderColor = "red";
    } else {
        yearCombobox.style.borderColor = "black";
    }

    if (!locationCombobox.selectedIndex) {
        // no location
        if (!isInvalid) {
            showMessage(infoBox, "You do not select location!", "red", true);
            isInvalid = true;
        }
        locationCombobox.style.borderColor = "red";
    } else {
        locationCombobox.style.borderColor = "black";
    }

    if (!numberValidation(inputPrice.value)) {
        // bad price
        if (!isInvalid) {
            showMessage(infoBox, "Price is not a number!", "red", true);
            isInvalid = true;
        }
        inputPrice.style.borderColor = "red";
    } else {
        inputPrice.style.borderColor = "black";
    }

    temp = emailValidation(inputEmail.value);
    if (!temp) {
        // bad email
        if (!isInvalid) {
            showMessage(infoBox, "Bad seller email!", "red", true);
            isInvalid = true;
        }
        inputEmail.style.borderColor = "red";
    } else {
        inputEmail.value = temp;
        inputEmail.style.borderColor = "black";
    }

    temp = phoneValidation(inputPhone.value);
    if (!temp) {
        // bad phone
        if (!isInvalid) {
            showMessage(infoBox, "Bad seller phone number!", "red", true);
            isInvalid = true;
        }
        inputPhone.style.borderColor = "red";
    } else {
        inputPhone.value = temp;
        inputPhone.style.borderColor = "black";
    }

    if (!isInvalid) {
        addObj = {
            typeIndex: typeCombobox.selectedIndex,
            builtYear: yearCombobox.value,
            locationIndex: locationCombobox.selectedIndex,
            price: inputPrice.value,
            imagesURL: getObjectValues(inputURLs),
            sellerEmail: inputEmail.value,
            sellerPhone: inputPhone.value,

            // default
            houseFloorsCount: 5,
            flatFloor: 2,
            roomsNumber: 2,
            square: 40,
            heatingTypeIndex: 0,
            renovationYear: 2020,
            isRenLoanPaidOff: false,
            countryPhoneCode: "+370",
            statusIndex: 0,
            isDeleted: false,
            deleteDate: "",
        };

        answer = addNewElement(glDataArrayURL, addObj);

        exit();
    }
});

inputPrice.addEventListener("focusout", () => {
    const isValid = numberValidation(inputPrice.value);
    inputPrice.style.borderColor = isValid ? "black" : "red";
});

inputEmail.addEventListener("focusout", () => {
    temp = emailValidation(inputEmail.value);
    if (temp.length) {
        inputEmail.value = temp;
    }
    inputEmail.style.borderColor = temp.length ? "black" : "red";
});

inputPhone.addEventListener("focusout", () => {
    temp = phoneValidation(inputPhone.value);
    if (temp.length) {
        inputPhone.value = temp;
    }
    inputPhone.style.borderColor = temp.length ? "black" : "red";
});

const exit = () => {
    setTimeout(() => {
        window.location.replace("../index.html");
    }, 1000);
};

const confimation = () => {
    confirmationWrapper.style.display = "flex";
    isConfimation = true;
    isYes = false;
    confirmText.style.color = "black";
};

yesButton.addEventListener("click", () => {
    isYes = true;
    confirmationWrapper.style.display = "none";
    isConfimation = false;
    // cancel

    exit();
});

noButton.addEventListener("click", () => {
    isYes = false;
    confirmationWrapper.style.display = "none";
    isConfimation = false;
});

cancelBtn.addEventListener("click", () => {
    // exit without deleting
    infoBox.style.display = "none";
    if (!isConfimation) {
        confimation(true);
    }
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
let isConfimation = false;
let isYes = false;
let isInvalid = false;

confirmationWrapper.style.display = "none";
infoBox.style.display = "none";
fillingComboboxes();

const newURL = addNewURL();

inputPrice.min = 0;

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
