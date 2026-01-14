const removeLastObject = (objectsArray) => {
    objectsArray[objectsArray.length - 1].remove();
    objectsArray.pop();
    return objectsArray;
};

export const getObjectValues = (objectsArray) => {
    const values = [];
    objectsArray.forEach((element) => {
        values.push(element.value);
    });

    console.log(values);

    return values;
};

export const fillHole = (objectsArray) => {
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

export const addNewElement = (objectWrapper, objectsArray, prefix) => {
    const newIndex = objectsArray.length - 1;
    const tempElement = document.getElementById(prefix + newIndex);
    objectsArray.push(tempElement);
    objectWrapper.append(tempElement);

    return tempElement;
};
