import Joi from "joi";

const itemSchema = Joi.object({
    name: Joi.string().required().trim(),
    image: Joi.string().required().uri(),
    stockTotal: Joi.number().integer().min(1).required(),
    pricePerDay: Joi.number().min(1).required(),
})

export default itemSchema