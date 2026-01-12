const topGamesWrapper = document.getElementById("top-games-wrapper");
const tempDeleteBtn = document.getElementById("tempDelete");
const restoreBtn = document.getElementById("restore");
const totalyDeleteBtm = document.getElementById("totalyDelete");
const exitButton = document.getElementById("exit");
const confirmationWrapper = document.getElementById("confirmation-wrapper");
const confirmtext = document.getElementById("confirmtext");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

// const url = new URL(window.location.href);
// const id = url.searchParams.get("id");

const id = 3;

const buildScreen = async () => {
    const response = await fetch(
        `https://695e14ac2556fd22f6773e58.mockapi.io/topGames/${id}`
    );

    game = await response.json();

    isTempDeleted = game.isDeleted;

    const card = document.createElement("a");
    card.classList.add("card");

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = game.image;

    const title = document.createElement("h1");
    title.classList.add("title");
    title.innerText = game.name;

    const realiseAndPlatforms = document.createElement("div");
    realiseAndPlatforms.classList.add("real-plat-wrapper");

    const realiseDate = document.createElement("h4");
    realiseDate.classList.add("realise-date");
    realiseDate.innerText = game.RealiseYear;

    const platforms = document.createElement("h4");
    platforms.classList.add("platforms");
    platforms.innerText = game.platforms;

    const disciption = document.createElement("p");
    disciption.classList.add("discription");
    disciption.innerText = game.description;

    card.append(image, title, realiseAndPlatforms, disciption);
    realiseAndPlatforms.append(realiseDate, platforms);

    topGamesWrapper.append(card);
};

const buttonsShow = (init) => {
    tempDeleteBtn.style.display = isTempDeleted || init ? "none" : "flex";
    restoreBtn.style.display = !isTempDeleted || init ? "none" : "flex";
    totalyDeleteBtm.style.display = init ? "none" : "flex";
};

const saveDeleteStatus = async () => {
    isTempDeleted = !isTempDeleted;
    game.isDeleted = isTempDeleted;

    const response = await fetch(
        `https://695e14ac2556fd22f6773e58.mockapi.io/topGames/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(game),
            headers: { "Content-Type": "application/json" },
        }
    );

    gameAfterAction = await response.json();
};

const totalyDeleting = async () => {
    isTempDeleted = !isTempDeleted;
    game.isDeleted = isTempDeleted;

    const response = await fetch(
        `https://695e14ac2556fd22f6773e58.mockapi.io/topGames/${id}`,
        {
            method: "DELETE",
        }
    );

    gameAfterAction = await response.json();
};

const exit = () => {
    setTimeout(() => {
        if (gameAfterAction) {
            window.location.replace("../index.html");
        }
    }, 1000);
};

const confimation = (isDeleting) => {
    confirmationWrapper.style.display = "flex";
    isConfimation = true;
    isYes = false;
    confirmtext.style.color = isDeleting ? "red" : "black";
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
    if (!isTempDeleted) {
        if (!isConfimation) {
            action.tempDelete = true;
            confimation(true);
        }
    }
});

restoreBtn.addEventListener("click", () => {
    //id=false
    if (isTempDeleted) {
        if (!isConfimation) {
            action.restore = true;
            confimation(true);
        }
    }
});

totalyDeleteBtm.addEventListener("click", () => {
    // DELETE
    //id=false
    if (isTempDeleted) {
        if (!isConfimation) {
            action.totalyDelete = true;
            confimation(true);
        }
    }
});

exitButton.addEventListener("click", () => {
    // exit without deleting
    if (!isConfimation) {
        action.exit = true;
        confimation(true);
    }
});

const actionDoing = () => {
    if (action.tempDelete || action.restore) {
        saveDeleteStatus();
    } else if (action.totalyDelete) {
        totalyDeleting();
        isTotalyDeleted = true;
        exit();
    } else if (action.exit) {
        exit();
    }
};

// ------------------------------------------
let isTempDeleted = false;
let isTotalyDeleted = false;
let isConfimation = false;
let isYes = false;
let game = {};

const gameAfterAction = {};

console.log(game);

const action = {
    tempDelete: false,
    restore: false,
    totalyDelete: false,
    exit: false,
};

confirmationWrapper.style.display = "none";

buttonsShow(true);

buildScreen();

buttonsShow(false);
