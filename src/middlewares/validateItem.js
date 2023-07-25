import itemSchema from "../schemas/item.schema.js";

export default function validateItem(req, res, next) {
    const { error } = itemSchema.validate(req.body, { abortEarly: false });

    if (error) return res.status(400).send(error.details.map((detail) => detail.message))
    
    next()
}