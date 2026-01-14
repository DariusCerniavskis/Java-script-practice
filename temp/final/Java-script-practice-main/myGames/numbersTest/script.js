// const adiv = document.getElementById("mydiv");
// const adiv2 = document.getElementById("mydiv2");
// let timestamp = 0;

// const moveDiv = () => {
//     leftPos += 1;
//     adiv.style.left = leftPos + "px";
//     console.log("1 " + timestamp);
//     if (leftPos > 100) {
//         return;
//     }

//     requestAnimationFrame(moveDiv);
// };

// const moveDiv2 = (timestamp) => {
//     leftPos += 1;
//     adiv2.style.left = leftPos + "px";
//     console.log("2 " + timestamp);
//     if (leftPos > 100) {
//         return;
//     }

//     requestAnimationFrame(moveDiv2);
// };

// let leftPos = 5;
// for (let i = 0; i < 5; i++) {
//     console.log(i);
//     requestAnimationFrame(moveDiv);
//     console.log(timestamp);
//     requestAnimationFrame(moveDiv2);
// }

// console.log(adiv2.left);

// const a = requestAnimationFrame(moveDiv);
// const a = moveDiv();

//
//
// ***************************************************
const adiv1 = document.getElementById("mydiv");
const adiv2 = document.getElementById("mydiv2");
const test = document.getElementById("test");
// let pos = 0;
let pos1 = 0;
let pos2 = 0;
let isGo = false;

// 1. Helper to animate an element to a target
const animateTo = (element, target, pos) => {
    return new Promise((resolve) => {
        const step = () => {
            pos += 2; // Speed
            element.style.transform = `translateX(${pos}px)`;
            if (pos < target) {
                requestAnimationFrame(step);
            } else {
                resolve(); // Animation finished
            }
        };
        requestAnimationFrame(step);
    });
};

// 2. Helper for the 5-second pause
const pause = (ms) => new Promise((res) => setTimeout(res, ms));

// 3. Main Sequence
// const runSequence = async () => {
//     for (let i = 0; i < 10; i++) {
//         // Repeat 3 times
//         console.log(`Starting Round ${i + 1}`);

//         // Move first div
//         await animateTo(adiv1, (i + 1) * 200, pos1);
//         pos1 += 200;

//         // 5-second pause

//         if (isGo) {
//             // Move second div
//             await animateTo(adiv1, pos1 + 200, pos1);
//             pos1 += 200;
//         } else {
//             await pause(5000);
//         }

//         // Reset positions if you want to repeat from start
//         // adiv1.style.transform = "translateX(0px)";
//         // adiv2.style.transform = "translateX(0px)";
//     }
// };

// runSequence();

test.addEventListener("click", () => {
    // let pause = (ms) => new Promise((res) => setTimeout(res, ms));

    const move = async () => {
        await animateTo(adiv1, (i + 1) * 200, pos1);
        pos1 += 200;
    };

    move();

    isGo = !isGo;
});

// while (true){
//     if(!isgo){
//    await pause(1)
//     }

// }
