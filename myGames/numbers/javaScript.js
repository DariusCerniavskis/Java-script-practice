// HTML elements
const squareObjects = document.querySelectorAll(".square");

const rndInit = () => {
    let rnd = Math.random();
    for (let i = 0; i < Math.round(rnd * 100); i++) {
        rnd = Math.random();
    }
};

const convertToCode = (number) => {
    return number > 9 ? String(number) : "0" + number;
};

const getBoxCode = (boxLine, boxColumn) => {
    return convertToCode(boxLine) + convertToCode(boxColumn);
};

const fillArray = (maxFieldSize) => {
    const valueRange = Math.abs(minNumber) + Math.abs(maxNumber) + 1;
    let tempObject = {};
    const tempField = [];

    for (let i = 0; i < maxFieldSize; i++) {
        for (let j = 0; j < maxFieldSize; j++) {
            // box object
            // value
            tempObject = {
                box: document.getElementById("position" + getBoxCode(i, j)),
                value:
                    minNumber + Number(Math.floor(Math.random() * valueRange)),
            };

            line.push(tempObject);
        }
        tempField.push(line);
        line = [];
    }
    return tempField;
};

const writeValueToBox = (fieldSize, maxFieldSize) => {
    let currentBox = {};
    let currentValue;
    for (let i = 0; i < maxFieldSize; i++) {
        line = field[i];
        for (let j = 0; j < maxFieldSize; j++) {
            currentBox = line[j].box;
            currentValue = line[j].value;
            if (i < fieldSize && j < fieldSize) {
                currentBox.textContent = currentValue;
                currentBox.style.color =
                    currentValue < -9
                        ? "red"
                        : currentValue < 0
                        ? "yellow"
                        : "white";
            } else {
                currentBox.style.display = "none";
            }
        }
    }
    return "OK";
};

// varables
let line = [];
let taskDone;
rndInit();

// start parameters
const minNumber = -15;
const maxNumber = 15;
const maxFieldSize = 10;
const fieldSize = 5;
const boxSize = `${Math.floor(500 / fieldSize)}px`;

// box size
squareObjects.forEach((el) => {
    el.style.Width = boxSize;
    el.style.Height = boxSize;
    console.log("width " + el.style.Width);
    console.log("height " + el.style.Height);
});

// field is amin array with objects
// "box": box object
// "value": box numeric value

const field = fillArray(maxFieldSize);

taskDone = writeValueToBox(fieldSize, maxFieldSize);
