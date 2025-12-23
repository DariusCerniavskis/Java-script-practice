const isValid = (dataType, inputData, minLenght) => {
    let warnMsg = `The `;

    if (!inputData || inputData.length < minLenght) {
        if (inputData.length > 0) {
            // too short
            warnMsg = warnMsg + `${dataType} is too short`;
        } else {
            warnMsg = warnMsg + `${dataType} is empty`;
        }

        warningMessage.textContent = `${warnMsg}. Please try again.`;
        return false;
    }
    return true;
};

const isEmailValid = (email) => {
    email.forEach((letter) => {
        let fullstopPosition = 0;
        let etaPosition = 0;
        let i = 0;

        console.log(letter);
        if (letter == ".") {
            fullstopPosition = i;
        } else if (letter == "@") {
            etaPosition = i;
        }
        i++;

        console.log(`fullstop ${fullstopPosition}  ---  eta ${etaPosition}`);
    });
    return etaPosition < fullstopPosition && etaPosition > 0;
};

const isLetDeleteElement = (isDeleteClick) => {
    if (isDeleteClick) {
        if (!deletewarning) {
            // first click
            warningMessage.textContent =
                "Are you sure. Please click again to delete.";
            deletewarning = true;
            return false;
        } else {
            // delete confirm
            deletewarning = false;
            warningMessage.textContent = "";
            return true;
        }
    } else {
        // Abandon deleting
        deletewarning = false;
        warningMessage.textContent = "";
        return false;
    }
};

const clearMesageOnActivate = () => {
    isLetDeleteElement(false);
    infoMessage.textContent = "";
    goodInfoMessage.textContent = "";
};

const arrayShow = (users) => {
    let msg = "";
    let msgLine = "";
    let count = 1;

    users.forEach((user) => {
        for (let key in user) {
            if (msgLine.length > 0) {
                msgLine = msgLine + " --- ";
            }
            msgLine = msgLine + user[key];
        }
        msg = msg + count + ". " + msgLine + "\n";
        msgLine = "";
        count++;
    });

    console.log(msg);
    infoMessage.textContent = msg;
};

const inputName = document.getElementById("userName");
const inputEmail = document.getElementById("userEmail");
const inputPassword = document.getElementById("userPassword");
const btnSubmit = document.getElementById("submit");
const btnDelete = document.getElementById("delete");
const warningMessage = document.getElementById("warning");
const infoMessage = document.getElementById("info");
const goodInfoMessage = document.getElementById("goodInfo");

const userData = [];
let deletewarning = false;

console.log("AAAAA" + "\n" + "fff");

inputName.textContent = `ez`;
inputEmail.textContent = `email@server.com`;
inputPassword.textContent = `0000`;

// ------------------------------------------------------------

let user;
isEmailValid(`email@server.com`);

user = {
    userName: `ez`,
    userEmail: `email@server.com`,
    userPassword: `0000`,
};
userData.push(user);
arrayShow(userData);

user = {
    userName: `ez2`,
    userEmail: `email@server.com2`,
    userPassword: `00002`,
};
userData.push(user);
arrayShow(userData);

inputName.addEventListener("click", () => {
    clearMesageOnActivate();
});

inputEmail.addEventListener("focusing", () => {
    clearMesageOnActivate();
});

inputPassword.addEventListener("focusing", () => {
    clearMesageOnActivate();
});

btnSubmit.addEventListener("click", () => {
    clearMesageOnActivate();
    if (
        isValid("user name", inputName.value, 2) &&
        isValid("user email name", inputEmail.value, 5) &&
        isValid("user password", inputPassword.value, 1)
    ) {
        const newUser = {
            userName: inputName.value,
            userEmail: inputEmail.value,
            userPassword: inputPassword.value,
        };
        userData.push(newUser);
        arrayShow(userData);
    }

    // console.log(inputName.value);
    // console.log(inputEmail.value);
    // console.log(inputPassword.value);
});

btnDelete.addEventListener("click", () => {
    if (userData.length > 0) {
        if (isLetDeleteElement(true)) {
            userData.pop();
            arrayShow(userData);
        }
    } else {
        infoMessage.textContent = "Data area is empty.";
    }
});
