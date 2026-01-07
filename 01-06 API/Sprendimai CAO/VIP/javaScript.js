// for (let k = 0; k < 10; k++) {
//     console.time(k + " Pranesimas"); //skaičiavimo startas
//     for (let j = 0; j < 30000; j++) {
//         n = 1;
//         for (let i = 1; i < j; i++) {
//             n = n * i;
//             if (n > 100000) {
//                 n = 1;
//             }
//         }
//     }

//     console.timeEnd(k + " Pranesimas");
// }

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

for (let k = 0; k < 10; k++) {
    console.time(k + " Pranesimas"); //skaičiavimo startas
    rndDelay(k);

    console.timeEnd(k + " Pranesimas");
}

// for (let i = 0; i < 5; i++) {
//     timer;
// }

// let timer = setInterval(() => {
//     console.log(`Waited for ${i * 2} seconds`);
//     // Clear the interval after the desired delay
//     clearInterval(timer);
// }, i * 2000);

// console.timeEnd("Pranesimas"); //skaičiavimo pabaiga ir rezultatas (ms)

// console.time("Pranesimas"); //skaičiavimo startas
// const delay = (seconds) => {
//     return new promise((resolve) => {
//         setTimeout(resolve, seconds * 1000);
//     });
// };

// async function reload(n, sec) {
//     console.log(`time passed...... ${n * s}`);
//     await delay(sec);
// }

// console.log("start");

// for (let i = 0; i < 5; i++) {
//     reload(i, 2);
// }

// let timer = setInterval(() => {
//     console.log(`Waited for ${i * 2} seconds`);
//     // Clear the interval after the desired delay
//     clearInterval(timer);
// }, i * 2000);

// const getRandomValue = (min, max) => {
//     const valueRange = Math.abs(min) + Math.abs(max);
//     const rndValue = min + Number(Math.floor(Math.random() * valueRange));
//     return rndValue;
// };

// let interval = 0;

// for (let i = 0; i < 10; i++) {
//     interval += getRandomValue(200, 600);

//     task(i, interval);
// }

// function task(i, inter) {
//     setTimeout(function () {
//         action(i, inter);
//     }, inter);

// }

// const action = (j, inter) => {
//     console.log(`${j}    act   ${inter / 1000}`);
// };

// console.timeEnd("Pranesimas");
