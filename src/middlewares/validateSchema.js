
export default function validateSchema(req, res, next, schema) {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) return res.status(400).send(error.details.map((detail) => detail.message))
    
    next()
}