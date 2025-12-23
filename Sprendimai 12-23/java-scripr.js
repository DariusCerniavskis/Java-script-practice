const isValid = (dataType, inputData, minLenght) => {
    // console.log(`reiksme${inputData}`);
    // console.log(!inputData);
    // console.log(inputData.lenght < minLenght);
    if (!inputData || inputData.lenght < minLenght) {
        console.log(`Invalid ${dataType}. Please try again.`);
        return false;
    }
    console.log(`Value is: ${inputData} `);
    return true;
};

const inputName = document.getElementById("userName");
const inputEmail = document.getElementById("userEmail");
const inputPassword = document.getElementById("userPassword");
const btnSubmit = document.getElementById("submit");

const userData = [];

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
    }

    // console.log(inputName.value);
    // console.log(inputEmail.value);
    // console.log(inputPassword.value);
});
