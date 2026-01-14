export const getObjectValues = (objectsArray) => {
    const values = [];
    objectsArray.forEach((element) => {
        values.push(element.value);
    });

    console.log(values);

    return values;
};


export const fillCombobox = (combobox, array, isDash) => {
    if (isDash) {
        addComboboxEment(combobox, "—");
    }

    array.forEach((element) => {
        addComboboxEment(combobox, element);
    });
};

export const numberValidation = (gotValue) => {
    return !isNaN(gotValue) && gotValue !== "";
};

export const emailValidation = (gotEmail) => {
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

export const phoneValidation = (gotPhone) => {
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

export const showMessage = (messageBox, message, color, isShow) => {
    if (isShow) {
        messageBox.innerText = message;
        messageBox.style.borderColor = color;
    }

    messageBox.style.display = isShow ? "flex" : "none";
};

export const removeEmptyObjects = (objectsArray) => {
    const isFirstEmpty = false;
    const firstEmpty = -1;

    objectsArray.forEach(object, (index) => {
        if (!object.value.length) {
            if (isFirstEmpty) {
                object.remove();
            } else {
                isFirstEmpty = true;
                firstEmpty = index;
            }
        }
    });

    for (let i = objectsArray.length - 1; i > firstEmpty; i--) {
        objectsArray.pop();
    }

    return objectsArray;
};

export const fillHoles = (objectsArray) => {
    const count = objectsArray.length;

    for (let i = 0; i < count; i++) {
        if (objectsArray[i].value.length) {
            // found hole
            for (let j = i; j < count - 1; j++) {
                if (objectsArray[j].value.length) {
                    objectsArray[j].value = objectsArray[j + 1].value;
                }
            }
        }
    }
    if (!objectsArray[count - 1].value.length) {
        removeEmptyObjects(objectsArray);
    } else {
        addNewObj(imgURLWrapper, inputURLs, "image-URL");
    }

    return objectsArray;
};

export const addNewElement = (objectWrapper, objectsArray, prefix) => {
    const newIndex = objectsArray.length - 1;
    const tempElement = document.getElementById(prefix + newIndex);
    objectsArray.push(tempElement);
    objectWrapper.append(tempElement);

    return tempElement;
};
