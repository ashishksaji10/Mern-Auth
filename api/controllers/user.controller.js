import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json(
        {message: "Hello World"}
    );
}

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can Update only your Account'))
    }

    try {

        const updateFields = {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
        };

        if (req.body.password && req.body.password.trim() !== "") {
            updateFields.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new : true}
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');

    } catch (error) {
        next(error)
    }
}