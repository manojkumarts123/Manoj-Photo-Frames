import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        door_no: String,
        street: String,
        area: String,
        city: String,
        state: String,
        country: String,
        land_mark: String
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;