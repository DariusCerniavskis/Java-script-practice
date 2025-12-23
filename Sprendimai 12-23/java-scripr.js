const isValid = (dataType, inputData, minLenght) => {
    if (!inputData || inputData.lenght < minLenght) {
        console.log(`Invalid ${dataType}. Please try again.`);
        return false;
    }
    return true;
};

const inputName = document.getElementById("userName");
const inputEmail = document.getElementById("userEmail");
const inputPassword = document.getElementById("userPassword");
const btnSubmit = document.getElementById("submit");
const btnDelete = document.getElementById("delete");
const fieldMessage = document.getElementById("message");

const userData = [];
let deleteConfirmation = false;

btnSubmit.addEventListener("click", () => {
    if (
        isValid("User name", inputName.value, 2) &&
        isValid("User email", inputEmail.value, 5) &&
        isValid("User password", inputPassword.value, 1)
    ) {
        const user = {
            userName: inputName.value,
            userEmail: inputEmail.value,
            userPassword: inputPassword.value,
        };
        userData.push(user);
        console.log(userData);
    }

    // console.log(inputName.value);
    // console.log(inputEmail.value);
    // console.log(inputPassword.value);
});
