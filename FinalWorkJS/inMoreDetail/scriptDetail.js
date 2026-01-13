// // header
const tempDeleteBtn = document.getElementById("tempDelete");
const restoreBtn = document.getElementById("restore");
const totalyDeleteBtm = document.getElementById("totalyDelete");
const exitButton = document.getElementById("exit");
const confirmationWrapper = document.getElementById("confirmation-wrapper");
const confirmText = document.getElementById("confirm-text");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
// card
const estateCardWrapper = document.getElementById("estate-card-wrapper");
const imageSrc = document.getElementById("card-img");
const type = document.getElementById("type");
const builtYear = document.getElementById("builtYear");
const cardImage = document.getElementById("cardImg");
const locationInDetail = document.getElementById("location");
const price = document.getElementById("price");
const infoBox = document.getElementById("infoBox");

// const url = new URL(window.location.href);
// const id = url.searchParams.get("id");
const id = 5;

// *************************************************************
// export globals
const typesOfRETempl = ["flat", "homestead", "garden-house"];
const locationsTempl = ["Vilnius", "Kaunas", "Klaipėda"];
const glDataArrayURL =
    "https://695e14ac2556fd22f6773e58.mockapi.io/realEstates";

// -------------------------------------------------------
// export fetch
const getElementFetch = async (fetchLink, elementId) => {
    const response = await fetch(fetchLink + "/" + elementId);

    answer = await response.json();

    return answer;
};

const totalyDeleteFetch = async (fetchLink, elementId) => {
    const response = await fetch(fetchLink + "/" + elementId, {
        method: "DELETE",
    });

    // laukiam kol įrašys
    answer = await response.json();

    return answer;
};

const updateElementFetch = async (fetchLink, elementId, updatingArray) => {
    const fullLink = `${fetchLink}/${elementId}`;

    const response = await fetch(fullLink, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatingArray),
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
};

// -----------------------------------------------------
// export function
//
//
//
//

// **********************************************************
//     realEstates=[]

//     addObj = {
//         typeIndex: 2,
//         builtYear: 2012,
//         locationIndex: 2,
//         price: 25000,

//         imagesURL: ["https://aruodas-img.dgn.lt/object_66_129604139/nuotrauka.jpg"],
//     };

//     realEstates.push(addObj)
//     const estate=realEstates[0]

// // **********************************************************

const fillCard = () => {
    infoBox.style.display = "none";
    console.log(estate);
    imageSrc.src = estate.imagesURL[0];
    type.innerText = typesOfRETempl[estate.typeIndex];
    builtYear.innerText = estate.builtYear;
    locationInDetail.innerText = locationsTempl[estate.locationIndex];
    price.innerText = estate.price + " ";
    infoBox.innerText = "";
};

const buildScreen = async (fetchURL, fetchId) => {
    buttonsShow(true);

    estate = await getElementFetch(fetchURL, fetchId);

    isTempDeleted = estate.isDeleted;

    fillCard();

    buttonsShow(false);
};

const buttonsShow = (init) => {
    tempDeleteBtn.style.display = isTempDeleted || init ? "none" : "flex";
    restoreBtn.style.display = !isTempDeleted || init ? "none" : "flex";
    totalyDeleteBtm.style.display = init ? "none" : "flex";
};

const saveDeleteStatus = async (fetchURL, fetchId) => {
    isTempDeleted = !isTempDeleted;
    estate.isDeleted = isTempDeleted;

    try {
        const estateAfterAction = await updateElementFetch(
            fetchURL,
            fetchId,
            estate
        );

        buttonsShow(false);

        infoBox.innerText = `Real estate was ${
            isTempDeleted ? "daleted from list" : "restored"
        } sucsesfully.`;

        infoBox.style.borderColor = "green";
    } catch (err) {
        infoBox.innerText = `Real estate ${
            isTempDeleted ? "daleting from list" : "restoring"
        } failed: ${err}`;
        infoBox.style.borderColor = "red";

        console.error("Update failed:", err);
    }

    infoBox.style.display = "flex";
};

const totalyDeleting = async (fetchURL, fetchId) => {
    estateAfterAction = await totalyDeleteFetch(fetchURL, fetchId);
};

const exit = () => {
    setTimeout(() => {
        if (estateAfterAction) {
            window.location.replace("../index.html");
        }
    }, 1000);
};

const confimation = (isDeleting) => {
    confirmationWrapper.style.display = "flex";
    isConfimation = true;
    isYes = false;
    confirmText.style.color = isDeleting ? "red" : "black";
};

yesButton.addEventListener("click", () => {
    isYes = true;
    confirmationWrapper.style.display = "none";
    isConfimation = false;
    actionDoing();
});

noButton.addEventListener("click", () => {
    isYes = false;
    confirmationWrapper.style.display = "none";
    isConfimation = false;
});

tempDeleteBtn.addEventListener("click", () => {
    // id=true
    infoBox.style.display = "none";
    if (!isTempDeleted) {
        if (!isConfimation) {
            action.tempDelete = true;
            confimation(true);
        }
    }
});

restoreBtn.addEventListener("click", () => {
    //id=false
    infoBox.style.display = "none";
    if (isTempDeleted) {
        action.restore = true;
        actionDoing();
    }
});

totalyDeleteBtm.addEventListener("click", () => {
    // DELETE
    //id=false
    infoBox.style.display = "none";
    if (isTempDeleted) {
        if (!isConfimation) {
            action.totalyDelete = true;
            confimation(true);
        }
    }
});

exitButton.addEventListener("click", () => {
    // exit without deleting
    infoBox.style.display = "none";
    if (!isConfimation) {
        action.exit = true;
        confimation(true);
    }
});

const actionDoing = () => {
    if (action.exit) {
        exit();
    } else if (action.totalyDelete) {
        totalyDeleting(glDataArrayURL, id);
        isTotalyDeleted = true;
        exit();
    } else {
        saveDeleteStatus(glDataArrayURL, id);
    }
};

// ------------------------------------------
let isTempDeleted = false;
let isTotalyDeleted = false;
let isConfimation = false;
let isYes = false;
let estate = {};

const estateAfterAction = {};

const action = {
    tempDelete: false,
    restore: false,
    totalyDelete: false,
    exit: false,
};

confirmationWrapper.style.display = "none";

buildScreen(glDataArrayURL, id);
