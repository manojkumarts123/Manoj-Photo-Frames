import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: string,
        required: true,
    }
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;