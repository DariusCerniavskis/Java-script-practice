// HTML elements
const cursorBox = document.getElementById("cursorBox");
const leftButton = document.getElementById("leftBtn");
const rightButton = document.getElementById("rightBtn");
const selectButton = document.getElementById("selectBtn");

const lblGameLevel = document.getElementById("gameLevel");

const tablePlayersHTML = [
    {
        playerName: document.getElementById("playerTableName"),
        playerScores: document.getElementById("playerTableScore"),
    },
    {
        playerName: document.getElementById("oponentTableName"),
        playerScores: document.getElementById("oponentTableScore"),
    },
];

const messageObj = {
    wrapper: document.getElementById("msgWrapper"),
    head: document.getElementById("msgHead"),
    currScores: [
        {
            playerName: document.getElementById("playerName0"),
            playerScores: document.getElementById("playerScores0"),
        },
        {
            playerName: document.getElementById("oponentName0"),
            playerScores: document.getElementById("oponentScores0"),
        },
    ],
    allScores: [
        {
            playerName: document.getElementById("playerName1"),
            playerScores: document.getElementById("playerScores1"),
        },
        {
            playerName: document.getElementById("oponentName1"),
            playerScores: document.getElementById("oponentScores1"),
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
// ASYNC FUNCTIONS
async function compCursorMoveLoop(stopPosition) {
    const tempValPositions = lineStatus.valuesPositions;
    let answer = "loop";

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    console.log(stopPosition);

    for (let i = 0; i < tempValPositions.length; i++) {
        const loopIndex = lineStatus.valuePosIndex;

        if (stopPosition === lineStatus.valuesPositions[loopIndex]) {
            answer = "stop";
            break;
        }

        nextCursorPosition(false);
        // await sleep(1);

        rndDelay(i);
    }
}

async function selectAnimation() {
    // selectAnimation2(cursorObj.size);

    for (let i = cursorObj.size; i > 20; i--) {
        moveCursor(i);
        // rndDelay(i);
        // await sleep(1);
    }
}

function selectAnimation2(i) {
    if (i > 20) {
        moveCursor(i);
        rndDelay(i);
        i--;

        // Schedule the next iteration for the next screen refresh
        requestAnimationFrame(selectAnimation2(i));
    }
}

// FUNCTIONS

const tableInitialization = () => {
    // tablePlayersHTML
    tablePlayersHTML[0].playerName.textContent = playersObj[0].playerName;
    tablePlayersHTML[0].playerScores.textContent = playersObj[0].playerScores;

    tablePlayersHTML[1].playerName.textContent = playersObj[1].playerName;
    tablePlayersHTML[1].playerScores.textContent = playersObj[0].playerScores;
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

const rndDelay = (speederIndex) => {
    // 0.2 sec  30000  (fastest)
    //  2 sec   40000   (slowest)
    const interval =
        getRandomValue(0, Math.round(25000 / (speederIndex + 1))) + 22000;

    console.log(interval);

    for (let a = 0; a < interval; a++) {
        c = 1;
        for (let b = 1; b < a; b++) {
            c = c * b;
            if (c > 100000) {
                c = 1;
            }
        }
    }
};
const convertToCode = (number) => {
    return number > 9 ? String(number) : "0" + number;
};

const getBoxCode = (boxLine, boxColumn) => {
    return convertToCode(boxLine) + convertToCode(boxColumn);
};

const fillArray = (maxFieldSize) => {
    let tempObject = {};
    field = [];

    for (let i = 0; i < maxFieldSize; i++) {
        line = [];
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
        field.push(line);
    }

    return;
};

const changeBox = (getActionCode, boxName, par1) => {
    // action Codes
    // 0 - write value  (par1 = value)
    // 1- box hide
    // 2- box size      (par1 = height)

    const currentBox = document.getElementById(boxName);
    console.log(currentBox);

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
        console.log(field);
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

const checkIsBorderOut = (curPos, newPos, dir) => {
    // -1  smaller out
    // 0   ok
    // 1   bigger Out

    if (Math.sign(curPos - newPos) === dir) {
        return dir;
    } else {
        return 0;
    }
};

const nextCursorPosition = (isNearest) => {
    let tempDirect = 0;
    let newIndex = 0;
    const tempValPosIndex = lineStatus.valuePosIndex;
    const tempOwnerNumber = cursorObj.ownerNumber;
    const tempValPosLenght = lineStatus.valuesPositions.length;
    let tempActiveValPos = 0;

    if (cursorObj.xDirection + cursorObj.yDirection) {
        //move

        if (tempOwnerNumber) {
            tempDirect = cursorObj.yDirection;
            tempActiveValPos = cursorObj.yNew;
        } else {
            tempDirect = cursorObj.xDirection;
            tempActiveValPos = cursorObj.xNew;
        }

        if (tempDirect < 0) {
            if (tempValPosIndex > 0) {
                newIndex = tempValPosIndex - 1;
            } else {
                newIndex = tempValPosLenght - 1;
            }
        } else {
            if (tempValPosIndex < tempValPosLenght - 1) {
                newIndex = tempValPosIndex + 1;
            } else {
                newIndex = 0;
            }
        }

        if (tempOwnerNumber) {
            cursorObj.yNew = lineStatus.valuesPositions[newIndex];
            cursorObj.yBorderOut = checkIsBorderOut(
                cursorObj.y,
                cursorObj.yNew,
                tempDirect
            );
            tempActiveValPos = cursorObj.yNew;
        } else {
            cursorObj.xNew = lineStatus.valuesPositions[newIndex];
            cursorObj.xBorderOut = checkIsBorderOut(
                cursorObj.x,
                cursorObj.xNew,
                tempDirect
            );
            tempActiveValPos = cursorObj.xNew;
        }

        if (isNearest) {
            // Delete hole in line
            let tempValuePositions = [];
            let j = 0;

            for (let i = 0; i < tempValPosLenght; i++) {
                if (tempActiveValPos === lineStatus.valuesPositions[i]) {
                    newIndex = j;
                }

                if (i !== tempValPosIndex) {
                    tempValuePositions.push(lineStatus.valuesPositions[i]);
                    j++;
                }
            }
            lineStatus.valuesPositions = tempValuePositions;
        }
        lineStatus.valuePosIndex = newIndex;
    }

    //check borders
    // in future will do mooving
    moveCursor();
};

const moveCursor = (curSize = 0) => {
    let strxpx = "";
    let strypx = "";
    let strSize = "";
    if (!curSize) {
        cursorObj.xpx = gameObj.x0 + getCoord(cursorObj.xNew);
        cursorObj.ypx = gameObj.y0 + getCoord(cursorObj.yNew);

        strxpx = `${cursorObj.xpx}px`;
        strypx = `${cursorObj.ypx}px`;

        strSize = `${cursorObj.size}px`;

        const currentColor = cursorColor[cursorObj.ownerNumber];
        cursorBox.style.borderColor = currentColor;

        cursorObj.x = cursorObj.xNew;
        cursorObj.y = cursorObj.yNew;
    } else {
        const selectionStep = Math.round((cursorObj.size - curSize) / 2);
        strxpx = `${cursorObj.xpx + selectionStep}px`;
        strypx = `${cursorObj.ypx + selectionStep}px`;

        strSize = `${curSize}px`;
    }

    cursorBox.style.left = strxpx;
    cursorBox.style.top = strypx;
    cursorBox.style.height = strSize;
    cursorBox.style.width = strSize;
};

const getFieldelEmentValue = (fx, fy) => {
    if (
        fx >= 0 &&
        fx < gameObj.fieldSize &&
        fy >= 0 &&
        fy < gameObj.fieldSize
    ) {
        line = field[fy];
        const gotValue = line[fx].value;
        if (!isNaN(gotValue)) {
            return gotValue;
        } else {
            return "Value is empty";
        }
    } else {
        return "Coordinates is outbound";
    }
};

const showScore = () => {
    let formatedScore = String(playersObj[cursorObj.ownerNumber].playerScores);
    const tablePlayer = tablePlayersHTML[cursorObj.ownerNumber];
    tablePlayer.playerScores.textContent = formatedScore;

    return "OK";
};

const addScore = (gotValue) => {
    if (!isNaN(gotValue)) {
        playersObj[cursorObj.ownerNumber].playerScores += gotValue;
        showScore();
    }

    return "OK";
};

const selectValue = () => {
    const x = cursorObj.x;
    const y = cursorObj.y;

    const gotValue = getFieldelEmentValue(x, y);

    if (!isNaN(gotValue)) {
        // when got, do it empty
        selectAnimation();

        line = field[y];
        const currBoxName = line[x].boxName;

        line[x].value = null;
        field[y] = line;
        changeBox(0, currBoxName, null);

        taskDone = addScore(gotValue);
    } else {
        console.log("error:  " + taskDone);
    }
};

const readScoreLine = (sx, sy) => {
    let tempfieldElementLine = [];
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

    console.log("tempScoreLine");
    console.log(tempScoreLine);
    return tempScoreLine;
};

const getNearestPosition = (positions, currPos, curPosIndex) => {
    let nearestSmaller = gameObj.fieldSize; //max
    let nearestBigger = gameObj.fieldSize; //max
    let distSmaler = gameObj.fieldSize; //max
    let distBigger = gameObj.fieldSize; //max
    let smallerInField = false;
    let biggerInField = false;

    const CountPositions = positions.length;

    smallerInField = !!curPosIndex;
    if (smallerInField) {
        nearestSmaller = positions[curPosIndex - 1];
        distSmaler = currPos - nearestSmaller;
    } else {
        nearestSmaller = positions[CountPositions - 1];
        distSmaler = currPos - (nearestSmaller - gameObj.fieldSize);
    }

    biggerInField = curPosIndex < CountPositions - 1;
    if (biggerInField) {
        nearestBigger = positions[curPosIndex + 1];
        distBigger = nearestBigger - currPos;
    } else {
        nearestBigger = positions[0];
        distBigger = nearestBigger + gameObj.fieldSize - currPos;
    }

    if (distSmaler || distBigger) {
        if (distSmaler < distBigger) {
            // go left

            return -1;
        } else if (distSmaler > distBigger) {
            // go right
            return 1;
        } else {
            // same distance
            if (biggerInField) {
                return 1;
            } else {
                return -1;
            }
        }
    } else {
        // cursor on box
        return 0;
    }
};

const createFieldLine = (isFirstTime) => {
    const tempOwnNmb = cursorObj["ownerNumber"];
    let tempValuePositions = [];
    let tempValPosIndex = 0; //position in line without holes
    let tempValPos = 0; //posisition in field

    if (tempOwnNmb) {
        tempValPos = isFirstTime ? cursorObj.yNew : cursorObj.y;
    } else {
        tempValPos = isFirstTime ? cursorObj.xNew : cursorObj.x;
    }

    scoreLine = readScoreLine(cursorObj.x, cursorObj.y);

    j = 0;
    for (let i = 0; i < gameObj.fieldSize; i++) {
        if (i === tempValPos) {
            tempValPosIndex = j;
        }

        if (scoreLine[i] !== null || i === tempValPos) {
            tempValuePositions.push(i);
            j++;
        }
    }

    if (tempValuePositions.length > 1) {
        lineStatus.valuesPositions = tempValuePositions;
        lineStatus.valuePosIndex = tempValPosIndex;
        lineStatus.verticalPlane = !!tempOwnNmb;

        if (!isFirstTime) {
            lineStatus.nearestDirection = getNearestPosition(
                tempValuePositions,
                tempValPos,
                tempValPosIndex
            );

            if (tempOwnNmb) {
                cursorObj.xDirection = 0;
                cursorObj.yDirection = lineStatus.nearestDirection;
            } else {
                cursorObj.xDirection = lineStatus.nearestDirection;
                cursorObj.yDirection = 0;
            }
        }
        nextCursorPosition(true);

        return 0; //Game status paly
    } else {
        // empty line. Game over
        //lose win
        gameObj.gameStatus = Math.sign(
            playersObj[0].playerScores - playersObj[1].playerScores
        );
        if (!gameObj.gameStatus) {
            gameObj.gameStatus = Math.sign(
                playersObj[0].allScores - playersObj[1].allScores
            );
        }

        gameObj.playerAction = actionOnMesage(gameObj.gameStatus);

        console.log("Game over!!!");
        console.log(playersObj);

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

        playersObj[0].allScores =
            playersObj[0].allScores + playersObj[0].playerScores;
        playersObj[1].allScores =
            playersObj[1].allScores + playersObj[1].playerScores;

        messageObj.currScores[0].playerName.textContent =
            playersObj[0].playerName;
        messageObj.currScores[0].playerScores.textContent =
            playersObj[0].playerScores;
        messageObj.currScores[1].playerName.textContent =
            playersObj[1].playerName;
        messageObj.currScores[1].playerScores.textContent =
            playersObj[1].playerScores;
        messageObj.conclusion.textContent =
            msgType === -1
                ? `Sorry. You are lost.`
                : `Congratulation. You are win!!!`;
        messageObj.conclusion.style.color = msgType === -1 ? `red` : `green`;

        messageObj.allScores[0].playerName.textContent =
            playersObj[0].playerName;
        messageObj.allScores[0].playerScores.textContent =
            playersObj[0].allScores;
        messageObj.allScores[1].playerName.textContent =
            playersObj[1].playerName;
        messageObj.allScores[1].playerScores.textContent =
            playersObj[1].allScores;

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
                if (!cursorObj.ownerNumber) {
                    // horizontal
                    cursorObj.xDirection = -1;
                    cursorObj.yDirection = 0;
                } else {
                    // vertical
                    cursorObj.xDirection = 0;
                    cursorObj.yDirection = gameObj.oponentComputer ? 0 : -1;
                }

                taskDone = nextCursorPosition(false);
            }
        });

        rightButton.addEventListener("click", () => {
            if (!isMessage) {
                if (!cursorObj.ownerNumber) {
                    // horizontal
                    cursorObj.xDirection = 1;
                    cursorObj.yDirection = 0;
                } else {
                    // vertical
                    cursorObj.xDirection = 0;
                    cursorObj.yDirection = gameObj.oponentComputer ? 0 : 1;
                }

                taskDone = nextCursorPosition(false);
            }
        });

        selectButton.addEventListener("click", () => {
            if (!isMessage) {
                taskDone = selectValue();
                cursorObj.ownerNumber = 1 - cursorObj.ownerNumber;

                tempGameStatus = createFieldLine(false);
                if (!tempGameStatus) {
                    taskDone = EndLevel();
                } else {
                    if (cursorObj.ownerNumber) {
                        computerTurn();
                    }
                }
            }
        });
    } else {
        // silence while message show
    }
};

const maxValuePosition = () => {
    let maxValue = gameObj.minNumber;
    const tempValPositions = lineStatus.valuesPositions;
    let maxPosition = -1;
    let tempValue = 0;
    let xTemp = cursorObj.x;

    tempValPositions.forEach((yPosition, index) => {
        tempValue = getFieldelEmentValue(xTemp, yPosition);
        if (maxValue <= tempValue) {
            maxValue = tempValue;
            maxPosition = tempValPositions[index];
        }
    });

    return maxPosition;
};

const compTurnCounting = () => {
    const maxPosition = maxValuePosition();

    // computer AI in future
    const choosenPosition = maxPosition;

    return choosenPosition;
};

const computerTurn = (direction) => {
    const choosenPosition = compTurnCounting();

    cursorObj.choosenPosition = choosenPosition;
    const myRnd = getRandomValue(0, 2);
    cursorObj.yDirection = myRnd == 0 ? -1 : 1;

    // taskDone = compCursorMoveLoop(-1); //full loop
    taskDone = compCursorMoveLoop(choosenPosition);
    // selectButton.click();
    return;
};

const EndLevel = () => {
    if (gameObj.playerAction > 0) {
        // yes
        if (gameObj.gameStatus > 0) {
            // win, next level
            gameObj.level++;
        } else {
            // lost, repeat
            gameObj.level = 1;
        }
        taskDone = startGame();
        return true;
    } else {
        // end game
        return false;
    }
};

const startGame = () => {
    lblGameLevel.textContent = gameObj.level;

    if (gameObj.fieldSize < gameObj.maxFieldSize) {
        // level up
        if (gameObj.level < 9) {
            gameObj.fieldSize = gameObj.level + 2;
        }
    }

    taskDone = fillArray(gameObj.maxFieldSize);

    // write values and hide
    taskDone = changeBoxesGroup(0, gameObj.fieldSize, gameObj.maxFieldSize);

    actionOnMesage(0);

    // box size
    // change height
    boxSize = Math.floor(500 / gameObj.fieldSize);

    // make boxes
    taskDone = changeBoxesGroup(
        2,
        gameObj.fieldSize,
        gameObj.maxFieldSize,
        `${boxSize}px`
    );
    cursorObj.size = boxSize - 2 * gameObj.cursorBorder;
    cursorBox.style.height = `${cursorObj.size}px`;
    cursorBox.style.width = `${cursorObj.size}px`;

    // hide the message box
    taskDone = actionOnMesage(0);

    playersObj[0].playerScores = 0;
    playersObj[0].palyerStatus = 0;
    playersObj[1].playerScores = 0;
    playersObj[1].palyerStatus = 0;

    taskDone = tableInitialization();

    // fill the cursorObject

    cursorObj.ownerNumber = 0;
    cursorObj.fieldBoxSize = boxSize;

    // START

    cursorObj.xNew = getRandomValue(0, gameObj.fieldSize);
    cursorObj.yNew = getRandomValue(0, gameObj.fieldSize);
    taskDone = createFieldLine(true);
    taskDone = nextCursorPosition(false);

    taskDone = driverButonActivity(true);
};

// -------------------------------------------------------------------------------------

// varables
let taskDone;
let stepDelay = 0; // delay when move computer
let boxSize = 0;
let tempGameStatus = 0; //-1 lost, 0- paly, 1- win

let isMessage = false;
let field = [];
let line = [];

rndInit();
let scoreLine = [];

let cursorObj = {
    name: "cursorBox",
    x: 0, //0-9  current poz
    y: 0, //0-9
    xNew: 0, //0-9  planing poz
    yNew: 0, //0-9
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
    size: 0,
};

cursorObj.xDirection = 0;

const cursorColor = cursorObj["color"];

let playersObj = [
    {
        playerName: "Player",
        playerScores: 0,
        allScores: 0,
        palyerStatus: 0, //-1 lose, 0- play, 1 win
    },
    {
        playerName: "Computer",
        playerScores: 0,
        allScores: 0,
        palyerStatus: 0, //-1 lose, 0- play, 1 win
    },
];

let lineStatus = {
    valuesPositions: [], // positions where are values
    valuePosIndex: -1, // index in valuesPositions array
    nearestPosition: 0, //where is nearest box
    nearestDirection: 0, //-1 L or T, 1 R or B
    verticalPlane: false, //False- hor, True - vert
};

// *********************************************************************************************
// start parameters

const gameObj = {
    //0-Continue,  -2 lost exit,-1 lost, again, 1- win
    gameStatus: 0, //-1 lost, 0- paly, 1- win
    playerAction: 0, //-1 exit, 0- current play, 1- another game
    minNumber: -3,
    maxNumber: 8,
    maxFieldSize: 10,
    fieldSize: 3,
    level: 1,
    oponentComputer: true,

    cursorBorder: 3,
    x0: 3,
    y0: 3,

    minCompMoveDelay: 200, //in miliseconds
    maxCompMoveDelay: 600, //in miliseconds

    choosenCompPos: -1, // vetical position with cpmputer choose (max)
};

// ******************************************************************************************

taskDone = startGame();

startButton.addEventListener("click", () => {
    // selectAnimation();

    gameObj.level++;
    taskDone = startGame();

    // if (!isMessage) {
    //     taskDone = actionOnMesage(1);
    // }
    // const taskas = (i) => {
    //     await(2000);
    //     console.log(i);
    // };
    // for (let i = 0; i < 10; i++) {
    //     taskas(i);
    // }
});
