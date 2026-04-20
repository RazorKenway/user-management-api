const Joi = require("joi");

// User creation validation schema
const createUserSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            "string.empty": "First name is required",
            "string.min": "First name must be at least 2 characters",
            "string.max": "First name must not exceed 50 characters"
        }),
    lastName: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            "string.empty": "Last name is required",
            "string.min": "Last name must be at least 2 characters",
            "string.max": "Last name must not exceed 50 characters"
        }),
    email: Joi.string()
        .required()
        .email()
        .lowercase()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),
    address: Joi.string()
        .required()
        .min(5)
        .max(100)
        .messages({
            "string.empty": "Address is required",
            "string.min": "Address must be at least 5 characters",
            "string.max": "Address must not exceed 100 characters"
        }),
    phoneNumber: Joi.string()
        .required()
        .pattern(/^[0-9]{10,15}$/)
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be between 10 and 15 digits"
        }),
    age: Joi.number()
        .optional()
        .min(0)
        .max(120)
        .messages({
            "number.min": "Age must be at least 0",
            "number.max": "Age must not exceed 120"
        })
});

// Validation middleware
const validateCreateUser = (req, res, next) => {
    const { error, value } = createUserSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const messages = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
        return res.status(400).json({
            message: "Validation error",
            errors: messages
        });
    }

    req.validatedBody = value;
    next();
};

module.exports = {
    validateCreateUser
};
