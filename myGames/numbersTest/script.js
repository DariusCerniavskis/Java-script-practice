// ***************************************************
const adiv1 = document.getElementById("mydiv");
const left = document.getElementById("left");
const up = document.getElementById("up");
const down = document.getElementById("down");
const right = document.getElementById("right");

let xPosition = 0;
let yPosition = 0;
let tempPosition = 0;
let speed = 3;
const distance = 100;

// 1. Helper to animate an element to a target
const animateTo = (object, position, speed, distance, isVerticaly) => {
    let way = 0;

    return new Promise((resolve) => {
        const step = () => {
            way = way + Math.abs(speed);
            position = position + speed; // speeed can be + or -
            if (isVerticaly) {
                object.style.top = `${position}px`;
            } else {
                object.style.left = `${position}px`;
            }

            if (way < distance) {
                requestAnimationFrame(step);
            } else {
                resolve(); // Animation finished
            }
        };
        requestAnimationFrame(step);
    });
};



const moovingAction = (object, speed, distance, isVerticaly) => {
    const direct = Math.sign(speed);
    if (isVerticaly) {
        tempPosition = yPosition;
        yPosition = yPosition + distance * direct;
    } else {
        tempPosition = xPosition;
        xPosition = xPosition + distance * direct;
    }

    const move = async () => {
        await animateTo(object, tempPosition, speed, distance, isVerticaly);
    };
    move();
};

left.addEventListener("click", () => {
    judam(adiv1, -Math.abs(speed), distance, false);
});

up.addEventListener("click", () => {
    judam(adiv1, -Math.abs(speed), distance, true);
});

down.addEventListener("click", () => {
    judam(adiv1, Math.abs(speed), distance, true);
});

right.addEventListener("click", () => {
    judam(adiv1, Math.abs(speed), distance, false);
});

