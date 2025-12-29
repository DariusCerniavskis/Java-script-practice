const taskNumber = 9;
if (taskNumber < 6) {
    // 1. Atspauzdinti ekrane teksto "Sveiki!, cia 12 paskaita." ilgį;
    const fraze1 = "Sveiki!, cia 12 paskaita.";
    console.log("1. " + fraze1.length);

    // 2. Atspauzdinti kurioje pozicijoje yra ženklas "!";
    const fraze2 = "Sveiki!, cia 12 paskaita.";
    console.log("2. " + fraze2.indexOf("!"));

    // 3. Tekstą "12" pakeist į "22";
    const fraze3 = "12";
    console.log("3. " + fraze3.replace("1", "2"));

    // 4. "     Atvaizduot šį tekstą ištrinus tarpus    " ;
    const fraze4 = "     Atvaizduot šį tekstą ištrinus tarpus    ";
    console.log("4. " + fraze4.trim());

    // 5. Sukurt sakinį. Parašyt kodą kuris kiekvieną sakinio žodį įdeda į atskirą masyvo elementą;
    const fraze5 =
        "Sukurt sakinį. Parašyt kodą kuris kiekvieną sakinio žodį įdeda į atskirą masyvo elementą";
    console.log("5.");
    const wordArray = fraze5.split(" ");
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
    fraze9 = "hello";
    reverseFraze = fraze9.split("").reverse().join("");
    console.log("9.   " + reverseFraze);
}
