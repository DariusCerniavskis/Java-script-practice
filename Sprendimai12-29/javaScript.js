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
