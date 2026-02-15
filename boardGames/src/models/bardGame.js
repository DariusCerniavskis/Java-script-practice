import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    toLocationPhotoUrl: { type: String, required: true },
});

import mongoose from "mongoose";

const schema =  mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            trim: true,
        },
        imgUrl: {
            type: String,
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
        },
        releaseYear: {
            type: Number,
        },
        minAvailableForPeopleNumber: {
            type: Number,
        },
        maxAvailableForPeopleNumber: {
            type: Number,
        },
        minBestPlayForPeopleNumber: {
            type: Number,
        },
        maxBestPlayForPeopleNumber: {
            type: Number,
        },
        recommendedStartingAge: {
            type: Number,
        },
        difficulty: {
            type: Number,
            min: 0,
            max: 5,
        },
        ratingsCount: {
            type: Number,
            default: 0,
        },
        minPlayingTime: {
            type: Number,
        },
        maxPlayingTime: {
            type: Number,
        },
    },
    
);

