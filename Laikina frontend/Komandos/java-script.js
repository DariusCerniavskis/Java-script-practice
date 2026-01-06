// Kintamieji
const myNumber = 1; //konstanta int
const myBigNumber = 123456n; //konstanta bigint
const myString = "str"; //konstanta raidinė
let isBoolean; // kintamasis loginis nedeklaruotas

//Aritmetika
//+ - * / %(likana) **(laipsnis)

let a = 1;
let b = 2;
let c;
c = a + b; //12 (str)
c = +a + +b; //3 (num)

a++; //a=a+1
a--; // a=a-1

a += b; // a=a+b

// Palyginimas
//== (nežiūri tipų), === (palygina ir tipus) != (<>), >=, <=
isBoolean = "2" > 1; //lyginama konvertavus "2" į 2

//logiškas įvertinimas (T  F)
//(100   0)
//("ssss"   "")

a > 1 && a < 10; //and
a > 1 || a < 10; //or
!a; //a==0

// ********************************************************
// Logika
if (a == 1) {
    // a equal 1
} else if (a > 3) {
    //a>3
} else {
    // a<1 arba a equal 2, 3
}

//Sutrumpintas if
c = a > 1 ? `a>1` : `a<=1`;

//************************************ */
//ciklai
for (let i = 0; i < 5; i++) {
    console.log(i);
}

while (i < 5) {
    console.log("labas");

    i++;
}

do {
    // statement
} while (condition);

//********************************* */
//JS funkcijos
// vertimas į kitą tipą
isBoolean = Boolean(a);
b = Number(a);
b = Number(undefined); // NaN
b = Number(null); //0
b = Number(true); //1
b = Number(false); //0
b = Number(`askd\t`); //NaN
b = Number(`1254.458\t\n`); //1254.458
b = Number(`12548.2547n`); //NaN

b = (12345).toString; //"12345"
b= new date("2021-01-05")   // konvertavimas į datą

//Apvalinimas iki 2 ženklų po kablelio
b = (Math.round(a * 100) / 100).toFixed(2);
// Apvalinimas iki n ženklų po kablelio
b = (Math.round(a * 10 ** n) / 10 ** n).toFixed(n);

// trupmeninės dalies atmetimas
b = Math.floor(a);
// apvalinimas į didesnę pusę
b = Math.ceil(a);

// teksto dalis
b = myString.substring(m, n); //dalis nuo m iki n

//esama savaitės diena
let weekDay = new Date().getDay(); //0-sekm

// teksto paieška kitame tekste
const email = "tomas@cmail.com";
console.log(email.indexOf("@")); //rodo @ poziciją
let isEmail = email.includes("@"); // T - F

// mid funkcija
const phoneNumber = +3706123456;
console.log(phoneNumber.slice(0, 4)); //+370
console.log(phoneNumber.slice(4)); //612..
console.log(phoneNumber.slice(-4)); //3456

// split funkcija
const token = "asdasdasdasd.123213231232";
console.log(token.split(".")[1]); //1232321

// teksto apvertimas
token = "12345678910";
console.log(token.split("").reverse().join(""));

// replace toks pat, repalceAll - keičia visus žodžius

// .toLowerCase,  .toUperCase
// .trim    .trimStart    .trimEnd

// patikrina ar integer
console.log(Number.isInteger(number));

// matematines funkcijos masyvui (SPREAD)
const numbers = [1, 2, 4, 6, 7, 8, 9];
let largestNum = Math.max(...numbers);

// Objekto vertimas stringu ir atvirkščiai
const user = { name: "Tomas", age: 20, city: "Vilnius" };
console.log(JSON.stringify(user));
console.log(JSON.parse(userString));

// raidė pagal indeksą
const str = "Hello, world!";
const firstChar = str.charAt(0); // firstChar = 'H'

// konvetavimas iš kitų sk sitemų
let number = parseInt("1010", 2); // konvertuoja 2 į 10

// Reduce funkcija (suma)
// sekančio ciklo metu acc turės tai, ką jam perdavėme praeito ciklo metu
const sum = numbers.reduce((acc, curr) => {
    return acc + curr;
});

// reduce (max) su objektų masyvu
const cheapestFlat = flats.reduce((acc, curr) => {
    return curr.kaina > acc.kaina ? curr : acc;
});

//reduce suma masyvo objektų
// acc pradžioje priskiriame 0
const flatsSum = flats.reduce((acc, curr) => {
    return acc + curr.kaina;
}, 0);

// SORT
// ... reiškia vidinio masyvo perkėlimas į išorinį
// 2 masyvai reikalingi, kad nemodifikuotų originalo
// positive - keičiam, negative - nekeičiam
const sortedNumbers = [...numbers].sort((a, b) => {
    return a - b; //didėja
    return b - a; // mažėja
});

//---------------------------------------------
//Vartotojo funkcijos

const myFunction = (par1, par2) => {
    //...
    return; //po return išeinama ir ignoruojamas likęs kodas
};

// kodo veikino laiko nustatymas
console.time("Pranesimas"); //skaičiavimo startas
// vykdomas kodas
console.timeEnd("pranesimas"); //skaičiavimo pabaiga ir rezultatas (ms)

//*************************************************************** */
//OBJEKTAI
const firstAddress = {
    city: "Vilnius",
    street: "Rinktinės",
    number: 34,
    zipCode: 12345,
};
//rakto objekte patikra
("city" in firstAddress)(
    //True
    "town" in firstAddress
); //False

//*************************************************************** */
//AREAS (MASYVAOI)
const cars = ["Mercedes", "Audi", "BMW"];
console.log(cars.length); //masyvo ilgis

cars.push("Lada"); //pridėti galan
cars.pop(); //pašalinti iš galo

cars.unshift("Porsche"); //pridėti priekin
cars.shift(); //pašalinti iš priekio

console.log(cars[0]); //pirmas elementas  "Mercedes"
console.log(cars[cars.length - 1]); //paskutinis elementas "BMW"

//Veiksmai su area elementais (perrinkimas)
cars.forEach((car) => {
    //kodas su kilevienu elementu car
});

//-------------------------------------------------------------------------
//Veismai su area of objects  [{}, {}, {},...]
//Filtravimas
const filteredFlats = flats.filter((flat) => {
    return flat.kaina > 200000 && flat.plotas > 70;
});

// Filtravimas pagal datą
const filteredUsers = users.filter((u) => {
   return new Date(u.registered) > new Date("2023-12-01");
 });




//  Area pirmi 2 įrašai
const topResults = transformetResults.slice(0, 2);





//Objects modifikavimas
const readyFlats = modifiedFlats.map((flat) => {
    return {
        ...flat, //klonuojami visi pradiniai objects
        isVerified: true,
        date: new Date(), //pridedama curdate
    };
});

//ar visi objcts turi?
const isEveryFlatHasPrice = modifiedFlats.every((flat) => {
    return flat.price > 10000;
});

// 
const isincludeFlats = modifiedFlats.include((flat) => {
    return flat.price >= 150000 && flat.price <= 200000;
});

//ar bent vienas Object turi?
const isSomeFlats = modifiedFlats.some((flat) => {
    return flat.price >= 150000 && flat.price <= 200000;
});

//*************************************************************************** */
//RYŠYS SU HTML
//1. Norimiems HTML elementams pridedame ID selectoriu
//    <buton id="my-buton"
//2. JS kreipiamasi į elementą per ID selectorių
//pvz sukuriamas elemento objektas
// pagal ID
const nameInput = document.getElementById("name");
// pagal clase (rasant naudojami [] )
const collection = document.getElementsByClassName("example color");
collection[0].style.backgroundColor = "red";
//pagal query selector (VEIKIA TIK SU PIRMU ELEMENTU IŠ GRUPĖS)
document.querySelector(".example").style.backgroundColor = "red";
// pagal querry selector norint, kad veiktų su visais
const lineWrapperObj = document.querySelectorAll(".line-wrapper");
lineWrapperObj.forEach((el) => (el.style.Height = boxSize));

//veiksmai atliekami, kai elementas (objektas) aktyvuojamas
//naujokamas
nameInput.addEventListener("click", () => {
    //JS komandos
});

//HTML objekto metodai
//reikšmės skaitymas
//
const myValue = nameInput.value;

// duomenu rašymas
nameInput.textContent = "pranešimas";

//Stilių keitimas su prierašu STYLE
gfg.style.color = "green";

//

// aukščio gavimas pagal selectorių
const fieldWrapper = document.querySelector(".field-wrapper");

console.log(fieldWrapper.offsetHeight);

// HTTML OBJEKTO KŪRIMAS
usersWrapper.innerHTML = ""; //išvalo konteinerį

const card = document.createElement("div"); //sukurti
card.setAttribute("class", "userCard"); //pridėti kllasę
card.innerText = u.name; //užpildas
usersWrapper.append(card); // atvaizdavimas

// -----------------------------------------------------------------

// Atmintie atlaisvinimas
// 1. Stop listening after data getting
const HandleClick = () => {
    //JS komandos
};
nameInput.addEventListener("click", HandleClick);
//jei nereikia užklausimo panaikinam laukimo režimą
nameInput.removeEventListener("click", HandleClick);

// 2. clear inerval after set
const timer = setInterval(myAction, 1000);
//Atlaisvinam atmintį, kai veiksmas baigėsi, o laikoas dar ne
clearInterval(timer);

// 3. Clear memory after removing object
let box = document.getElementById("box");
document.body.replaceChild(box);
// clear memory
box = null;

// 4. Nerodyti masyvų ar objektų su neaiškiu dydžiu, kai jie naudojami kaip buferia
const cache = {};
const LIMIT = 50; // kintmasisi dydžio kontrolei

// ------------------------------------------------------------------------
// Local storiges
localStorage.setItem("userName", "Linas");
// objekto įrašymas
const user2 = {
    name: "Linas",
    age: 31,
    city: "Vilnius",
};
localStorage.setItem("mainInfo", JSON.stringify(user2));
// Objekto skaitymas (jei jo nėra - tuščia)
const mainInfo = JSON.parse(localStorage.getItem("mainInfo")) || {};
// Duomenų šalinimas iš Local storage
localStorage.removeItem("users");
