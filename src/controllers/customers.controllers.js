import CustomerORM from "../database/orm.customers.js"

const orm = new CustomerORM()

export async function getCustomers(req, res){
    const customers = await orm.read()
    // console.log(customers)
    res.send(customers)
}

export async function getCustomerById(req, res){
    const id = req.params
    const customer = await orm.readById(id)
    console.log(customer)

    customer ? res.send(customer) : res.status(404).send("Usuário não encontrado!")
}