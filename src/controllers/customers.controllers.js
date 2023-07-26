import CustomerDAO from "../database/dao/dao.customers.js"
import { format } from 'date-fns';

const dao = new CustomerDAO()

export async function getCustomers(req, res){
    const customers = await dao.read()
    // console.log(customers)
    res.send(customers)
}

export async function getCustomerById(req, res) {
    const id = req.params;
    const customer = await dao.readById(id);
    console.log(customer);

    if (customer) {
        customer.birthday = format(new Date(customer.birthday), 'yyyy-MM-dd');
        res.send(customer).status(201);
    } else {
        res.status(404).send("Usuário não encontrado!");
    }
}


export async function postCustomer(req, res){
    const data = req.body
    const insertedData = await dao.create(data)

    
    if (insertedData) return res.sendStatus(201)
}