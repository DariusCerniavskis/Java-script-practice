// w11
import mongoose from "mongoose";

// 7
// const mongoose = require("mongoose");

const estateSchema = mongoose.Schema({
    id: { type: String, required: true },
    typeIndex: { type: Number, required: true },
    builtYear: { type: Number, required: true },
    locationIndex: { type: Number, required: true },
    price: { type: Number, required: true },
    imagesURL: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    sellerPhone: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },

    houseFloorsCount: { type: Number, required: false },
    flatFloor: { type: Number, required: false },
    roomsNumber: { type: Number, required: false },
    square: { type: Number, required: false },
    heatingTypeIndex: { type: Number, required: false },
    renovationYear: { type: Number, required: false },
    isRenLoanPaidOff: { type: Boolean, required: false },
    countryPhoneCode: { type: String, required: false },
    statusIndex: { type: Number, required: false },
    deleteDate: { type: Date, required: false },
});

export default mongoose.model("estateModel", estateSchema);
