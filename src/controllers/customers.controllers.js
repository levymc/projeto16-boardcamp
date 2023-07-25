import CustomerORM from "../database/orm.customers.js"

const orm = new CustomerORM()

export async function getCustomers(req, res){
    const customers = await orm.read()
    console.log(customers)
    res.send(customers)
}