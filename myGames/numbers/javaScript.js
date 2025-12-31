// HTML elements
const cursorBox = document.getElementById("cursorBox");
const leftButton = document.getElementById("leftBtn");
const rightButton = document.getElementById("rightBtn");
const selectButton = document.getElementById("selectBtn");

const gameLevel = document.getElementById("gameLevel");

const tablePlayers = [
    {
        playerName: document.getElementById("playerTableName"),
        playerScore: document.getElementById("playerTableScore"),
    },
    {
        playerName: document.getElementById("oponentTableName"),
        playerScore: document.getElementById("oponentTableScore"),
    },
];

const messageObj = {
    wrapper: document.getElementById("msgWrapper"),
    head: document.getElementById("msgHead"),
    players: [
        {
            playerName: document.getElementById("playerName"),
            playerScore: document.getElementById("playerScore"),
        },
        {
            playerName: document.getElementById("oponentName"),
            playerScore: document.getElementById("oponentScore"),
        },
    ],
    conclusion: document.getElementById("conclusion"),
    msgQuestion: document.getElementById("msgQuestion"),
    buttons: {
        yesButton: document.getElementById("yesBtn"),
        noButton: document.getElementById("noBtn"),
    },
};

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
        if (!isNaN(par1)) {
            currentBox.textContent = par1;

            currentBox.style.color =
                par1 < -9 ? "red" : par1 < 10 ? "white" : "greenyellow";
        } else {
            // empty
            currentBox.textContent = "";
        }

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
    moveCursor();
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
    // in future will do mooving
    const isBorderOut = checkIsBorderOut(xDirection, yDirection);

    placeCursor();
};

const moveCursor = () => {
    cursorBox.style.left = `${cursorObj["xpx"]}px`;
    cursorBox.style.top = `${cursorObj["ypx"]}px`;
    const currentColor = cursorColor[cursorObj["ownerNumber"]];
    cursorBox.style.borderColor = currentColor;
};

const getFieldelEmentValue = (fx, fy) => {
    if (fx >= 0 && fx < fieldSize && fy >= 0 && fy < fieldSize) {
        line = field[fy];
        const currBoxName = line[fx].boxName;
        const gotValue = line[fx].value;
        if (!isNaN(gotValue)) {
            // when got, do it empty
            line[fx].value = null;
            field[fy] = line;
            changeBox(0, currBoxName, null);

            return gotValue;
        } else {
            return "Value is empty";
        }
    } else {
        return "Coordinates is outbound";
    }
};

const showScore = () => {
    let formatedScore = String(scoreArray[cursorObj.ownerNumber]);
    const tablePlayer = tablePlayers[cursorObj.ownerNumber];
    tablePlayer["playerScore"].textContent = formatedScore;

    return "OK";
};

const addScore = (gotValue) => {
    console.log("Add score:  " + gotValue);
    if (!isNaN(gotValue)) {
        scoreArray[cursorObj.ownerNumber] += gotValue;
        showScore();
    }

    return "OK";
};

const selectValue = () => {
    const x = cursorObj["x"];
    const y = cursorObj["y"];

    const gotValue = getFieldelEmentValue(x, y);

    if (!isNaN(gotValue)) {
        taskDone = addScore(gotValue);
    } else {
        console.log("select value error:  " + taskDone);
    }

    return;
};

const readScoreLine = () => {
    const tempScoreLine = [];
    const x = cursorObj["x"];
    const y = cursorObj["y"];

    if (cursorObj["ownerNumber"]) {
        // verticaly
        field.forEach((line) => {
            tempScoreLine.push(line[x]);
        });
    } else {
        // horizontaly
        tempScoreLine = field[y];
    }
};

const getNearestPosition = (positions, currPos) => {
    positions.push(currPos);

    let curPosIndex = 0;
    let nearestSmaller = fieldSize; //max
    let nearestBigger = fieldSize; //max
    let distSmaler = fieldSize; //max
    let distBigger = fieldSize; //max

    const CountPositions = positions.length;

    const sortedPositions = [...positions].sort((a, b) => {
        return a - b; //min to max
    });

    for (let i = 0; i < CountPositions; i++) {
        if (currPos === sortedPositions[i]) {
            curPosIndex = i;
            break;
        }
    }

    if (curPosIndex > 0) {
        nearestSmaller = sortedPositions[curPosIndex - 1];
        distSmaler = currPos - nearestSmaller;
    } else {
        nearestSmaller = sortedPositions[CountPositions - 1];
        distSmaler = currPos - (nearestSmaller - fieldSize);
    }

    if (curPosIndex < CountPositions - 1) {
        nearestBigger = sortedPositions[curPosIndex + 1];
        distBigger = nearestBigger - currPos;
    } else {
        nearestBigger = sortedPositions[0];
        distBigger = nearestBigger + fieldSize - currPos;
    }

    if (!distSmaler || !distBigger) {
        // cursor on box
        return [currPos, 0];
    }

    if (distSmaler < distBigger) {
        // go left

        return { nextPos: nearestSmaller, direct: -1 };
    } else {
        // go right
        return { nextPos: nearestBigger, direct: 1 };
    }
};

const analyzeFieldLine = () => {
    const tempOwnNmb = cursorObj["ownerNumber"];
    let tempValuePosition = [];
    let tempCursorPosition = 0;
    let nearestPosAndDir = {}; //new position, direction
    if (tempOwnNmb) {
        tempCursorPosition = cursorObj["y"];
    } else {
        tempCursorPosition = cursorObj["x"];
    }

    scoreLine = readScoreLine();

    for (let i = 0; i < fieldSize; i++) {
        if (!isNaN(scoreLine[i])) {
            tempValuePosition.push(i);
        }
    }

    if (tempValuePosition.length) {
        nearestPosAndDir = getNearestPosition(
            tempValuePosition,
            tempCursorPosition
        );

        lineStatus = {
            valuesPositions: tempValuePosition,
            cursorPosition: tempCursorPosition,
            nearestPosition: nearestPosAndDir["nextPos"],
            nearestDirection: nearestPosAndDir["direct"],
            valuesCount: tempValuePosition.length,
            varticalPlane: !!tempOwnNmb,
        };
        return "OK";
    } else {
        // empty line. GAme over
        return "Game over!";
    }
};

const showMesage = (msgType) => {
    //  Types
    // 0- hide message
    // 1 Lost
    // 2 win

    if (msgType == 0) {
        // hide message
        message.wrapper.display = `none`;
    } else {
        message.players[0].playerName.textContent = tablePlayers[0].playerName;
        message.players[0].playerScore.textContent =
            tablePlayers[0].playerScore;
        message.players[1].playerName.textContent = tablePlayers[1].playerName;
        message.players[1].playerScore.textContent =
            tablePlayers[1].playerScore;
        message.conclusion.textContent =
            msgType === 1
                ? `Sorry. You are lost.`
                : `Congratulation. You are win!!!`;
        message.conclusion.color = msgType === 1 ? `red` : `green`;
        message.msgQuestion.textContent = `Do you want to paly the game ${
            msgType === 1 ? "again?" : " in higher level?"
        }`;
        message.wrapper.display = `flex`;
    }
};

const message = {
    wrapper: document.getElementById("msgWrapper"),
    head: document.getElementById("msgHead"),
    players: [
        {
            playerName: document.getElementById("playerName"),
            playerScore: document.getElementById("playerScore"),
        },
        {
            playerName: document.getElementById("oponentName"),
            playerScore: document.getElementById("oponentScore"),
        },
    ],
    conclusion: document.getElementById("conclusion"),
    msgQuestion: document.getElementById("msgQuestion"),
    buttons: {
        yesButton: document.getElementById("yesBtn"),
        noButton: document.getElementById("noBtn"),
    },
};

// -------------------------------------------------------------------------------------

// varables
let line = [];
let taskDone;
rndInit();
let scoreArray = [0, 0];
let scoreLine = [];

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
    color: [
        "yellow", //palyer cursor colour
        "red", //oponent cursor color
    ],
};
const cursorColor = cursorObj["color"];

let lineStatus = {
    valuesPositions: [], // positions where are values
    cursorPosition: 0, //where is cursor now
    nearestPosition: 0, //where is nearest box
    nearestDirection: 0, //-1 L or T, 1 R or B
    valuesCount: 0, //0- game over, 1- do not move, >1 can move
    varticalPlane: false, //False- hor, True - vert
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

selectButton.addEventListener("click", () => {
    taskDone = selectValue();
    cursorObj["ownerNumber"] = 1 - cursorObj["ownerNumber"];
    // change cursor color
    taskDone = moveCursor();
});
