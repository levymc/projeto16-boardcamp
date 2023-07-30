import CustomerDAO from "../database/dao/dao.customers.js"
import { format } from 'date-fns';

const dao = new CustomerDAO()

export async function getCustomers(req, res){
    const paramName = req.query.name

    try{
        const customers = await dao.read()
        const formatedCustomers = await Promise.all(customers.map(async (customer) => {
            customer.birthday = format(new Date(customer.birthday), 'yyyy-MM-dd');
            return customer;
        }))
        res.send(formatedCustomers)
    }catch (err) {
        console.error("Erro getById customer:", err)
        return res.status(500).send("Erro customer.")
    }
    
}

export async function getCustomerById(req, res) {
    const id = req.params;
    try{
        const customer = await dao.readById(id.id);

        if (customer) {
            customer.birthday = format(new Date(customer.birthday), 'yyyy-MM-dd');
            res.send(customer).status(201);
        } else {
            res.status(404).send("Usuário não encontrado!");
        }
    }catch (err) {
        console.error("Erro getById customer:", err)
        return res.status(500).send("Erro customer.")
    }
    
}

export async function postCustomer(req, res){
    const data = req.body
    const insertedData = await dao.create(data)
    if (insertedData) return res.sendStatus(201)
}

export async function updateCustomer(req, res){
    const data = req.body
    console.log(data)
    const id = req.params.id
    const updateData = await dao.update(id, data)
    if(updateData){
        return res.sendStatus(200)
    }else{
        return res.sendStatus(500)
    }
}