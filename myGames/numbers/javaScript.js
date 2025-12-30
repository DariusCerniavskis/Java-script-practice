// HTML elements
const cursorBox = document.getElementById("cursorBox");
const leftButton = document.getElementById("leftBtn");
const rightButton = document.getElementById("rightBtn");
const selectButton = document.getElementById("selecttBtn");

const rndInit = () => {
    let rnd = Math.random();
    for (let i = 0; i < Math.round(rnd * 100); i++) {
        rnd = Math.random();
    }
};

const getRandomValue = (min, max) => {
    valueRange = Math.abs(min) + Math.abs(max);
    const rndValue = min + Number(Math.floor(Math.random() * valueRange));
    return rndValue;
};

const convertToCode = (number) => {
    return number > 9 ? String(number) : "0" + number;
};

const getBoxCode = (boxLine, boxColumn) => {
    return convertToCode(boxLine) + convertToCode(boxColumn);
};

const fillArray = (maxFieldSize) => {
    let tempObject = {};
    const tempField = [];

    for (let i = 0; i < maxFieldSize; i++) {
        for (let j = 0; j < maxFieldSize; j++) {
            // box object
            // value
            tempObject = {
                boxName: "position" + getBoxCode(i, j),

                //max+1 range field values range included
                value: getRandomValue(minNumber, maxNumber + 1),
            };

            line.push(tempObject);
        }
        tempField.push(line);
        line = [];
    }
    return tempField;
};

const changeBox = (getActionCode, boxName, par1) => {
    // action Codes
    // 0 - write value  (par1 = value)
    // 1- box hide
    // 2- box size      (par1 = height)

    const currentBox = document.getElementById(boxName);

    if (getActionCode == 0) {
        currentBox.textContent = par1;
        currentBox.style.color =
            par1 < -9 ? "red" : par1 < 10 ? "white" : "greenyellow";

        currentBox.style.display = "flex";
    } else if (getActionCode == 1) {
        currentBox.style.display = "none";
    } else if (getActionCode == 2) {
        currentBox.style.height = par1;
    }
};

const changeBoxesGroup = (getActionCode, fieldSize, maxFieldSize, par1) => {
    // action Codes
    // 0 - write value
    // 1- box hide
    // 2- box size      (par1 = height)

    let actionCode = 0;
    const loopFieldSize = getActionCode == 0 ? maxFieldSize : fieldSize;

    for (let i = 0; i < loopFieldSize; i++) {
        line = field[i];
        for (let j = 0; j < loopFieldSize; j++) {
            if (getActionCode == 0) {
                // write value or hide
                actionCode = +(i >= fieldSize || j >= fieldSize);
                changeBox(actionCode, line[j].boxName, line[j].value);
                //
            } else if (getActionCode == 2) {
                // change hight
                changeBox(2, line[j].boxName, par1);
            }
        }
    }
    return "OK";
};

const getCoord = (position) => {
    return position * boxSize;
};

const placeCursor = () => {
    cursorObj["xpx"] = x0 + getCoord(cursorObj["x"]);
    cursorObj["ypx"] = x0 + getCoord(cursorObj["y"]);

    //palce cursor firs time
    moveCursor(true);
};

const checkIsBorderOut = (xDir, yDir) => {
    let outFlag = false;
    let xNew = cursorObj["x"] + xDir;
    let yNew = cursorObj["y"] + yDir;

    if (xNew < 0) {
        xNew = fieldSize - 1;
        cursorObj["xBorderOut"] = -1;
    } else if (xNew == fieldSize) {
        xNew = 0;
        cursorObj["xBorderOut"] = -1;
    } else {
        cursorObj["xBorderOut"] = 0;
    }

    outFlag = !!cursorObj["xBorderOut"];
    // console.log("xborder " + cursorObj["xBorderOut"] + "   " + outFlag);

    if (yNew < 0) {
        yNew = fieldSize - 1;
        cursorObj["yBorderOut"] = -1;
    } else if (yNew == fieldSize) {
        yNew = 0;
        cursorObj["yBorderOut"] = -1;
    } else {
        cursorObj["yBorderOut"] = 0;
    }

    if (!outFlag) {
        outFlag = !!cursorObj["yBorderOut"];
    }

    cursorObj["x"] = xNew;
    cursorObj["y"] = yNew;

    return outFlag;
};

const nextCursorPosition = () => {
    let xDirection = 0;
    let yDirection = 0;

    if (cursorObj["ownerNumber"]) {
        yDirection = cursorObj["yDirection"];
    } else {
        xDirection = cursorObj["xDirection"];
    }

    if (!(xDirection + yDirection)) {
        //not move
        return;
    }

    //check borders
    const isBorderOut = checkIsBorderOut(xDirection, yDirection);

    placeCursor();
};

const moveCursor = (isPlacing) => {
    if (isPlacing) {
        cursorBox.style.left = `${cursorObj["xpx"]}px`;
        cursorBox.style.top = `${cursorObj["ypx"]}px`;
    }
};

// -------------------------------------------------------------------------------------

// varables
let line = [];
let taskDone;
rndInit();

let cursorObj = {
    name: "cursorBox",
    x: 0, //0-9
    y: 0, //0-9
    fieldBoxSize: 0, //depend on field size
    xpx: 0, //pixels from left
    ypx: 0, //pixels from top
    ownerNumber: 0, //0-palyer (horozontal), 1- computer (vertical)
    xDirection: 0, //current direction -1 - left, 0- stop,  1 - right
    yDirection: 0, //current direction -1 - top,  0- stop, 1 - bottom
    xBorderOut: 0, //0- in border, -1 - from left to right, 1 - from right to left
    yBorderOut: 0, //0- in border, -1 - from bottom to top, 1 - from top to bottom
    color1: "yellow", //palyer cursor colour
    color2: "red", //computer cursor color
};

// *********************************************************************************************
// start parameters
const minNumber = -15;
const maxNumber = 15;
const maxFieldSize = 10;
const fieldSize = 6;
const cursorBorder = 3;
const x0 = 3;
const y0 = 3;

// ******************************************************************************************

// field is amin array with objects
// "box": box object
// "value": box numeric value

const field = fillArray(maxFieldSize);

// write values and hide
taskDone = changeBoxesGroup(0, fieldSize, maxFieldSize);

// box size
// change height
const boxSize = Math.floor(500 / fieldSize);
const cursorSize = boxSize - 2 * cursorBorder;
cursorBox.style.height = `${cursorSize}px`;
cursorBox.style.width = `${cursorSize}px`;

// make boxes
taskDone = changeBoxesGroup(2, fieldSize, maxFieldSize, `${boxSize}px`);

// fill the cursorObject

cursorObj["x"] = getRandomValue(0, fieldSize);
cursorObj["y"] = getRandomValue(0, fieldSize);
cursorObj["fieldBoxSize"] = boxSize;

taskDone = placeCursor();

// moving
cursorObj["ownerNumber"] = 0;

leftButton.addEventListener("click", () => {
    if (!cursorObj["ownerNumber"]) {
        // horizontal
        cursorObj["xDirection"] = -1;
        cursorObj["yDirection"] = 0;
    } else {
        // vertical
        cursorObj["xDirection"] = 0;
        cursorObj["yDirection"] = -1;
    }

    taskDone = nextCursorPosition();
});

rightButton.addEventListener("click", () => {
    if (!cursorObj["ownerNumber"]) {
        // horizontal
        cursorObj["xDirection"] = 1;
        cursorObj["yDirection"] = 0;
    } else {
        // vertical
        cursorObj["xDirection"] = 0;
        cursorObj["yDirection"] = 1;
    }

    taskDone = nextCursorPosition();
});
