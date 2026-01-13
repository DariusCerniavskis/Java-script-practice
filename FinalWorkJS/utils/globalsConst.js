export const typesOfRETempl = ["flat", "homestead", "garden-house"];

export const locationsTempl = ["Vilnius", "Kaunas", "Klaipėda"];

export const typesOfHeatingTempl = [
    "central",
    "solid fuel",
    "gas",
    "electricity",
    "geothermal",
    "fuel oil",
];

export const status = ["offer", "reserved", "sold"];

export const addingTempl = {
    id: 0,
    typeIndex: 0,
    locationIndex: 0,
    houseFloorsCount: 5,
    flatFloor: 2,
    roomsNumber: 2,
    sqare: 40,
    price: 70000,
    heatingTypeIndex: 0,
    builtYear: 1985,
    renovationYear: 2020,
    isRenLoanPaidOff: false,
    imagesURL: [],
    sellerEmail: "example@gmail.com",
    countryPhoneCode: "+370",
    sellerPhone: "",
    statusIndex: 0,
    isDeleted: false,
    deleteDate: "",
};

export const filterTempl = {
    types: [],
    locations: [],
    houseFloors: [],
    flatFloors: [],
    roomsNumbers: [],
    sqaresMin: 35,
    squareMax: 60,
    priceMin: 40000,
    priceMax: 100000,
    heatingTypes: [],
    builtYearMin: 1975,
    builtYearMax: 2025,
    renovationYearMin: 2015,
    renovationYearMax: 2025,
    isRenLoanPaidOff: false,

    statusIndex: 0,
};

const glDataArrayURL = "https://695e14ac2556fd22f6773e58.mockapi.io/";
const glArrayURLprefix = "realEstates";
