import CustomerORM from "../database/orm.customers.js"

const orm = new CustomerORM()

export default async function validateCPF(req, res, next){
    const cpf = req.body.cpf
    const result = await orm.readByCPF(cpf)
    if (result) return res.status(409).send("CPF já existente.")
    next()
}