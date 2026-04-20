const User = require("../models/userModel");

// CREATE USER
exports.createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, address, phoneNumber, age } = req.body;

        if (!firstName || !lastName || !email || !address || !phoneNumber) {
            return res.status(400).json({ message: "firstName, lastName, email, address, and phoneNumber are required" });
        }

        const user = await User.create({ firstName, lastName, email, address, phoneNumber, age });

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// GET ALL USERS (with pagination bonus)
exports.getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;

        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// GET USER BY ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
};

// DELETE USER
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
};