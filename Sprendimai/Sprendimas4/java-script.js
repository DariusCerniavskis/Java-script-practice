const drawComb = (lenght) => {
    for (i = 0; i < lenght; i++) {
        console.log("#".repeat(i % 2 === 0 ? lenght : 1));
    }
    console.log("#".repeat(lenght % 2 === 0 ? lenght : 0));
};

combLenght = Number(prompt("What is comb lenght ?"));

drawComb(combLenght);

console.log(`The task is done`);
