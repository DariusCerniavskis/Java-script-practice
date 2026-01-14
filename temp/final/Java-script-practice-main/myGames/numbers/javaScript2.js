// HTML elements
const cursorBox = document.getElementById("cursorBox");
const leftButton = document.getElementById("leftBtn");
const rightButton = document.getElementById("rightBtn");
const selectButton = document.getElementById("selectBtn");

const gameLevel = document.getElementById("gameLevel");

const tablePlayersHTML = [
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

const startButton = document.getElementById("startBtn");

// *****************************************************************
// FUNCTIONS

const tableInitialization = () => {
    // tablePlayersHTML
    tablePlayersHTML[0].playerName.textContent = playersObj[0].playerName;
    tablePlayersHTML[0].playerScore.textContent = playersObj[0].playerScore;

    tablePlayersHTML[1].playerName.textContent = playersObj[1].playerName;
    tablePlayersHTML[1].playerScore.textContent = playersObj[0].playerScore;
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
                value: getRandomValue(gameObj.minNumber, gameObj.maxNumber + 1),
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
    cursorObj["xpx"] = gameObj.x0 + getCoord(cursorObj["x"]);
    cursorObj["ypx"] = gameObj.y0 + getCoord(cursorObj["y"]);

    //palce cursor firs time
    moveCursor();
};

const checkIsBorderOut = (xDir, yDir) => {
    let outFlag = false;
    let xNew = cursorObj["x"] + xDir;
    let yNew = cursorObj["y"] + yDir;

    if (xNew < 0) {
        xNew = gameObj.fieldSize - 1;
        cursorObj["xBorderOut"] = -1;
    } else if (xNew == gameObj.fieldSize) {
        xNew = 0;
        cursorObj["xBorderOut"] = -1;
    } else {
        cursorObj["xBorderOut"] = 0;
    }

    outFlag = !!cursorObj["xBorderOut"];

    if (yNew < 0) {
        yNew = gameObj.fieldSize - 1;
        cursorObj["yBorderOut"] = -1;
    } else if (yNew == gameObj.fieldSize) {
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
    if (
        fx >= 0 &&
        fx < gameObj.fieldSize &&
        fy >= 0 &&
        fy < gameObj.fieldSize
    ) {
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
    let formatedScore = String(playersObj[cursorObj.ownerNumber].playerScore);
    const tablePlayer = tablePlayersHTML[cursorObj.ownerNumber];
    tablePlayer["playerScore"].textContent = formatedScore;

    return "OK";
};

const addScore = (gotValue) => {
    if (!isNaN(gotValue)) {
        playersObj[cursorObj.ownerNumber].playerScore += gotValue;
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

const readScoreLine = (sx, sy) => {
    const tempfieldElementLine = [];
    const tempScoreLine = [];

    if (cursorObj["ownerNumber"]) {
        // verticaly
        field.forEach((line) => {
            tempfieldElementLine.push(line[sx]);
        });
    } else {
        // horizontaly
        tempfieldElementLine = field[sy];
    }

    for (let i = 0; i < gameObj.fieldSize; i++) {
        tempScoreLine.push(tempfieldElementLine[i].value);
    }

    return tempScoreLine;
};

const getNearestPosition = (positions, currPos) => {
    positions.push(currPos);

    let curPosIndex = 0;
    let nearestSmaller = gameObj.fieldSize; //max
    let nearestBigger = gameObj.fieldSize; //max
    let distSmaler = gameObj.fieldSize; //max
    let distBigger = gameObj.fieldSize; //max

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
        distSmaler = currPos - (nearestSmaller - gameObj.fieldSize);
    }

    if (curPosIndex < CountPositions - 1) {
        nearestBigger = sortedPositions[curPosIndex + 1];
        distBigger = nearestBigger - currPos;
    } else {
        nearestBigger = sortedPositions[0];
        distBigger = nearestBigger + gameObj.fieldSize - currPos;
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
        tempCursorPosition = cursorObj.y;
    } else {
        tempCursorPosition = cursorObj.x;
    }

    console.log(cursorObj.x + "  curpoz  " + cursorObj.y);

    scoreLine = readScoreLine(cursorObj.x, cursorObj.y);

    console.log("scoreLine");
    console.log(scoreLine);

    for (let i = 0; i < gameObj.fieldSize; i++) {
        if (scoreLine[i] !== null) {
            tempValuePosition.push(10);
            console.log(
                i +
                    " push " +
                    scoreLine[i] +
                    "  tempValuePosition element " +
                    tempValuePosition
            );
        } else {
            tempValuePosition.push(-100);

            console.log(
                i +
                    " tuščia    " +
                    scoreLine[i] +
                    "  tempValuePosition element " +
                    tempValuePosition
            );
        }
    }

    console.log("tempValuePosition");
    console.log(tempValuePosition);

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
            verticalPlane: !!tempOwnNmb,
        };

        if (lineStatus.verticalPlane) {
            cursorObj.yDirection = lineStatus.nearestDirection;
            cursorObj.yBorderOut =
                Math.sign(cursorObj.y - lineStatus.nearestPosition) ===
                cursorObj.yDirection;
            cursorObj.y = lineStatus.nearestPosition;
        } else {
            cursorObj.xDirection = lineStatus.nearestDirection;
            cursorObj.xBorderOut =
                Math.sign(cursorObj.x - lineStatus.nearestPosition) ===
                cursorObj.xDirection;
            cursorObj.x = lineStatus.nearestPosition;
        }
        console.log("lineStatus");
        console.log(lineStatus);

        console.log("cursorObj");
        console.log(cursorObj);

        return 0; //Game status paly
    } else {
        // empty line. Game over
        //lose win
        gameObj.gameStatus = Math.sign(
            playersObj[0].playerScore - playersObj[1].playerScore
        );
        if (!gameObj.gameStatus) {
            gameObj.gameStatus = Math.sign(
                playersObj[0].allScore - playersObj[1].allScore
            );
        }

        gameObj.playerAction = actionOnMesage(gameObj.gameStatus);
        return gameObj.gameStatus;
    }
};

const actionOnMesage = (msgType) => {
    //  Types
    // -1 Lost
    // 0- hide message
    // 1 win

    if (msgType == 0) {
        // hide message
        messageObj.wrapper.style.display = `none`;
        isMessage = false;
        return;
    } else if (msgType == -1 || msgType == 1) {
        isMessage = true;
        let clickYes = 0;

        messageObj.players[0].playerName.textContent = playersObj[0].playerName;
        messageObj.players[0].playerScore.textContent =
            playersObj[0].playerScore;
        messageObj.players[1].playerName.textContent = playersObj[1].playerName;
        messageObj.players[1].playerScore.textContent =
            playersObj[1].playerScore;
        messageObj.conclusion.textContent =
            msgType === -1
                ? `Sorry. You are lost.`
                : `Congratulation. You are win!!!`;
        messageObj.conclusion.style.color = msgType === -1 ? `red` : `green`;
        messageObj.msgQuestion.textContent = `Do you want to paly the game ${
            msgType === -1 ? "again?" : " in higher level?"
        }`;
        messageObj.wrapper.style.display = "flex";

        messageObj.buttons.yesButton.addEventListener("click", () => {
            if (isMessage) {
                clickYes = 1;
                actionOnMesage(0);
            }
        });
        messageObj.buttons.noButton.addEventListener("click", () => {
            if (isMessage) {
                clickYes = -1;
                actionOnMesage(0);
            }
        });

        return clickYes;
    }
};

const driverButonActivity = (isActive) => {
    if (isActive) {
        leftButton.addEventListener("click", () => {
            if (!isMessage) {
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
            }
        });

        rightButton.addEventListener("click", () => {
            if (!isMessage) {
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
            }
        });

        selectButton.addEventListener("click", () => {
            if (!isMessage) {
                taskDone = selectValue();
                cursorObj["ownerNumber"] = 1 - cursorObj["ownerNumber"];

                taskDone = analyzeFieldLine();
                console.log("Game status " + taskDone);

                if (taskDone === 0) {
                    taskDone = moveCursor();
                } else {
                    //game over
                    console.log("Game over");
                }
            }
        });
    } else {
        // silence while message show
    }
};

// -------------------------------------------------------------------------------------

// varables
let taskDone;

let isMessage = false;
let line = [];

rndInit();
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

let playersObj = [
    {
        playerName: "Player",
        playerScore: 0,
        allScore: 0,
        palyerStatus: 0, //-1 lose, 0- play, 1 win
    },
    {
        playerName: "Computer",
        playerScore: 0,
        allScore: 0,
        palyerStatus: 0, //-1 lose, 0- play, 1 win
    },
];

let lineStatus = {
    valuesPositions: [], // positions where are values
    cursorPosition: 0, //where is cursor now
    nearestPosition: 0, //where is nearest box
    nearestDirection: 0, //-1 L or T, 1 R or B
    valuesCount: 0, //0- game over, 1- do not move, >1 can move
    verticalPlane: false, //False- hor, True - vert
};

// *********************************************************************************************
// start parameters

const gameObj = {
    //0-Continue,  -2 lost exit,-1 lost, again, 1- win
    gameStatus: 0, //-1 lost, 0- paly, 1- win
    playerAction: 0, //-1 exit, 0- current play, 1- another game
    minNumber: -15,
    maxNumber: 15,
    maxFieldSize: 10,
    fieldSize: 3,

    cursorBorder: 3,
    x0: 3,
    y0: 3,
};

// ******************************************************************************************

// field is amin array with objects
// "box": box object
// "value": box numeric value

const field = fillArray(gameObj.maxFieldSize);

// write values and hide
taskDone = changeBoxesGroup(0, gameObj.fieldSize, gameObj.maxFieldSize);

// box size
// change height
const boxSize = Math.floor(500 / gameObj.fieldSize);
const cursorSize = boxSize - 2 * gameObj.cursorBorder;
cursorBox.style.height = `${cursorSize}px`;
cursorBox.style.width = `${cursorSize}px`;

// make boxes
taskDone = changeBoxesGroup(
    2,
    gameObj.fieldSize,
    gameObj.maxFieldSize,
    `${boxSize}px`
);
// hide the message box
taskDone = actionOnMesage(0);

taskDone = tableInitialization();

// fill the cursorObject

cursorObj["x"] = getRandomValue(0, gameObj.fieldSize);
cursorObj["y"] = getRandomValue(0, gameObj.fieldSize);
cursorObj["fieldBoxSize"] = boxSize;

taskDone = placeCursor();

// moving
cursorObj["ownerNumber"] = 0;

taskDone = driverButonActivity(true);

startButton.addEventListener("click", () => {
    if (!isMessage) {
        taskDone = actionOnMesage(1);
    }
});
