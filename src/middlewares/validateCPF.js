import CustomerDAO from "../database/dao/dao.customers.js"

const orm = new CustomerDAO()

export default async function validateCPF(req, res, next){
    const cpf = req.body.cpf
    const result = await orm.readByCPF(cpf)
    if (result) return res.status(409).send("CPF já existente.")
    next()
}