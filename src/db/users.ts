import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

const UserModel = mongoose.model('User', userSchema);

const getUsers = () => UserModel.find();

const getUserByEmail = (email: string) => UserModel.findOne({ email });

const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});

const getUserById = (id: string) => UserModel.findById(id);

const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export {
    UserModel,
    getUsers,
    getUserByEmail,
    getUserBySessionToken,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById
}