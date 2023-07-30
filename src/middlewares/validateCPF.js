import CustomerDAO from "../database/dao/dao.customers.js"

const orm = new CustomerDAO()

export async function validateCPF(req, res, next){
    const cpf = req.body.cpf
    const result = await orm.readByCPF(cpf)
    console.log("AUQIS", result)
    if (result) return res.status(409).send("CPF já existente.")
    next()
}

export async function validateCPF2(req, res, next){
    console.log(req.body)
    const id = Number(req.params.id)
    const cpf = req.body.cpf
    const result = await orm.readByCPF(cpf)
    console.log(result)
    if (result != null){
        if (result.id === id) return next()
    }
    console.log("IDs diferentes", id, result )
    if (result) return res.status(409).send("CPF já existente.")
    next()
}