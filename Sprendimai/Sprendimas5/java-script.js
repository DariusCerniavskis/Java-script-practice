const isNumberguessed = (number) => {
    if (number < 1 || number > 6) {
        return `${number} is not between 1 and 6`;
    }

    const random = Math.ceil(Math.random() * 6);

    if (number === random) {
        return `You success. Run and bye the lotery tickets.`;
    } else {
        return `You lose`;
    }
};

guessNumber = Number(prompt("Guess number between 1 and 6?"));

console.log(isNumberguessed(guessNumber));
