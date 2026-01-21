import estateModel from "../model/estate.js";
import { v4 as uId } from "uuid";

export const getAllEstates = async (req, res) => {
    const estates = await estateModel.find();

    return res.json({ estates: estates });
};

export const getEstateById = async (req, res) => {
    const id = req.params.id;

    const estate = await estateModel.findOne({ id: id });

    res.status(200).json({ estate: estate });
};

export const addEstate = async (req, res) => {
    const estate = new estateModel({ id: uId(), ...req.body });
    await estate.save();
    res.json({ estate: estate });
};

export const updateEstateById = async (req, res) => {
    const id = req.params.id;

    const estate = await estateModel.findOneAndUpdate({
        id: id,
        ...req.body,
        new: true,
    });

    res.status(200).json({ estate: estate });
};

export const deleteEstateById = async (req, res) => {
    const id = req.params.id;

    const deletedEstate = await estateModel.findAndDelete({ id: id });

    if (!deletedEstate) {
        return res
            .status(404)
            .json({ message: `No real estate with id: ${id}` });
    }

    res.status(200).json({ car: deletedEstate });
};
