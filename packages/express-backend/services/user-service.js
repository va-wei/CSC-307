import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    } else if (name && job) {
        promise = findUsersByNameAndJob(name, job);
    }
    return promise;
}
  
function findUserByName(name) {
    return userModel.find({ name: name });
};

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findUsersByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job });
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise // returns promise
};

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

function generateRandomId() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUsersByNameAndJob,
    deleteUserById,
    generateRandomId
  };