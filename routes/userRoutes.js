const express = require("express");
const router = express.Router();
const {
    createUser,
    getUsers,
    getUserById,
    deleteUser
} = require("../controllers/userController");
const { validateCreateUser } = require("../middleware/validateMiddleware");

router.post("/", validateCreateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

module.exports = router;

module.exports = router;