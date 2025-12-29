const taskNumber = 14;

if (taskNumber < 6) {
    // 1. Atspauzdinti ekrane teksto "Sveiki!, cia 12 paskaita." ilgį;
    const phrase1 = "Sveiki!, cia 12 paskaita.";
    console.log("1. " + phrase1.length);

    // 2. Atspauzdinti kurioje pozicijoje yra ženklas "!";
    const phrase2 = "Sveiki!, cia 12 paskaita.";
    console.log("2. " + phrase2.indexOf("!"));

    // 3. Tekstą "12" pakeist į "22";
    const phrase3 = "12";
    console.log("3. " + phrase3.replace("1", "2"));

    // 4. "     Atvaizduot šį tekstą ištrinus tarpus    " ;
    const phrase4 = "     Atvaizduot šį tekstą ištrinus tarpus    ";
    console.log("4. " + phrase4.trim());

    // 5. Sukurt sakinį. Parašyt kodą kuris kiekvieną sakinio žodį įdeda į atskirą masyvo elementą;
    const phrase5 =
        "Sukurt sakinį. Parašyt kodą kuris kiekvieną sakinio žodį įdeda į atskirą masyvo elementą";
    console.log("5.");
    const wordArray = phrase5.split(" ");
    console.log(wordArray);
} else if (taskNumber == 6) {
    // 6. Parašyt funkciją kuri paduotą sumą paverčia į formatą "xx.xx$"(po kablelio 2 skaičiai);

    const sumInDolars = (sum) => {
        const convertedSum = (Math.round(sum * 100) / 100).toFixed(2) + "$";
        return convertedSum;
    };
    const mySum = prompt("Task 6. Numbers?");
    console.log(sumInDolars(mySum));
} else if (taskNumber == 7 || taskNumber == 8) {
    // 7. Susikurkit produkto obj, jį paverskit į tekstą;
    myObject = {
        street: "Vilties",
        houseNumber: 15,
        flatNumber: 3,
        town: "Ignalina",
        country: "Lithuania",
    };
    const objToString = JSON.stringify(myObject);
    console.log("7.   " + objToString);
    // 8. Paverstą obj tekstą atgal į objektą;
    const stringToObj = JSON.parse(objToString);
    console.log("8.");
    console.log(stringToObj);
} else if (taskNumber == 9) {
    // 9.reverseString('hello'); // "olleh"
    const phrase9 = "hello";
    reversephrase = phrase9.split("").reverse().join("");
    console.log("9.   " + reversephrase);
} else if (taskNumber == 10) {
    // 10. isPalindrome('madam'); // true     isPalindrome('hello'); // false

    const phrase10 = prompt("word?");
    reversephrase = phrase10.split("").reverse().join("");
    console.log(
        `10.   ${phrase10} is ${
            phrase10 != reversephrase ? "NOT" : ""
        } polindrome.`
    );
} else if (taskNumber == 11) {
    // 11. findChar('javascript', 'v'); // 2      findChar('javascript', 'x'); // -1

    const phrase11 = "javascript";

    console.log(`Position v in ${phrase11} is ${phrase11.indexOf("v")}`); //2

    console.log(`Position x in ${phrase11} is ${phrase11.indexOf("x")}`); //-1
} else if (taskNumber == 12) {
    // 12. stringToNumberSum("100", 50); // "150" (funkcijai paduodame string)
    const aString = "100";
    const bNumber = 50;

    console.log(`12. Number function ${Number(aString) + bNumber}`);
    console.log(`12. + to convet ${+aString + bNumber}`);
} else if (taskNumber == 13) {
    // 13. Sukurti funkciją kuri kuriai galime paduoti telefono numerį, funkcija gražints atgal žvaigždutes su 3 paskutiniais telefono numerio simboliais;
    const hidePhoneNumber = (phoneNumber) => {
        if (phoneNumber.length < 4) {
            return phoneNumber;
        }

        const stars = "*".repeat(phoneNumber.length - 3);
        const lastThree = phoneNumber.slice(-3);
        return stars + lastThree;
    };

    const phrase13 = prompt("Phone number?");

    const hiddenNumber = hidePhoneNumber(phrase13);
    console.log(`${phrase13} convert to ${hiddenNumber}`);
} else if (taskNumber == 14) {
    // 14. Parašyti funkciją kuriai yra paduodamas masyvas su uždraustais žodžiais ir pats
    // tekstas. For ciklo pagalba tekstas turi būt iteruojamas su kiekvienu raktažodžiu
    //  bei taip visi uždrausti žodžiai paversti "***".
    const getNumberInWords = (number, digitsWords) => {
        const numberInString = String(number);
        const digits = numberInString.split("");
        let numbersInWords = "";

        digits.forEach((digit) => {
            numbersInWords += digitsWords[+digit] + " ";
        });
        return numbersInWords.trimEnd();
    };

    const getCorrectPhrase = (badPhrase, forbiddenWords) => {
        let goodPhrase = badPhrase;
        let stars2 = "";
        forbiddenWords.forEach((forbiddenWord) => {
            stars2 = "*".repeat(forbiddenWord.length);
            goodPhrase = goodPhrase.replaceAll(forbiddenWord, stars2);
        });

        return goodPhrase;
    };

    const numbersWords = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];

    const myForbidden = ["", "one", "three", "five", "seven", "nine"];

    const phrase14 = prompt("Odd is forbiden. Number?");

    const myNumberInWords = getNumberInWords(phrase14, numbersWords);

    const correctPhrase = getCorrectPhrase(myNumberInWords, myForbidden);
    console.log(`${myNumberInWords} convert to ${correctPhrase}`);
}
