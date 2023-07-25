import conectDB from "./database.connection.js";

class Customer {
    constructor(name, phone, cpf, birthday) {
        this.name = name;
        this.phone = phone;
        this.cpf = cpf;
        this.birthday = birthday;
    }
}
    
export default class CustomerORM {
    constructor() {
    this.pool = null;
    this.customers = [];
    }

    async connect() {
    this.pool = await conectDB();
    console.log("Conexão com o banco de dados estabelecida.");
    }

    async disconnect() {
    if (this.pool) {
        await this.pool.end();
        console.log("Conexão com o banco de dados encerrada.");
    }
    }

    async create(customerData) {
    await this.connect();
    const newCustomer = new Customer(
        customerData.name,
        customerData.phone,
        customerData.cpf,
        customerData.birthday
    );

    const queryString =`
        INSERT INTO public.customers ("name", phone, cpf, birthday) VALUES ($1, $2, $3, $4)
    `
        
    const values = [
        newCustomer.name,
        newCustomer.phone,
        newCustomer.cpf,
        newCustomer.birthday,
    ];

    try {
        await this.pool.query(queryString, values);
        console.log("Novo cliente adicionado ao banco de dados.");
    } catch (error) {
        console.error(
        "Erro ao adicionar novo cliente ao banco de dados:",
        error.message
        );
    }

    this.customers.push(newCustomer);
    await this.disconnect();
    return newCustomer;
    }

    async read() {
    await this.connect();

    const queryString = 'SELECT * FROM public.customers';

    try {
        const response = await this.pool.query(queryString);
        console.log("Consulta realizada com sucesso.");
        await this.disconnect();
        return response.rows || [];
    } catch (error) {
        console.error(
        "Erro ao consultar os clientes no banco de dados:",
        error.message
        );
        await this.disconnect();
        return [];
    }
    }

    async update(id, customerData) {
    await this.connect();

    const customerToUpdate = this.customers.find((customer) => customer.id === id);
    if (!customerToUpdate) {
        await this.disconnect();
        return null; // Cliente não encontrado, retorna null
    }

    customerToUpdate.name = customerData.name || customerToUpdate.name;
    customerToUpdate.phone = customerData.phone || customerToUpdate.phone;
    customerToUpdate.cpf = customerData.cpf || customerToUpdate.cpf;
    customerToUpdate.birthday = customerData.birthday || customerToUpdate.birthday;

    const queryString =
        'UPDATE public.customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5';
    const values = [
        customerToUpdate.name,
        customerToUpdate.phone,
        customerToUpdate.cpf,
        customerToUpdate.birthday,
        id,
    ];

    try {
        await this.pool.query(queryString, values);
        console.log("Cliente atualizado no banco de dados.");
    } catch (error) {
        console.error(
        "Erro ao atualizar o cliente no banco de dados:",
        error.message
        );
    }

    await this.disconnect();
    return customerToUpdate;
    }

    async delete(id) {
    await this.connect();

    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
        await this.disconnect();
        return null;
    }

    const queryString = 'DELETE FROM public.customers WHERE id = $1';
    const values = [id];

    try {
        await this.pool.query(queryString, values);
        console.log("Cliente excluído do banco de dados.");
    } catch (error) {
        console.error(
        "Erro ao excluir o cliente do banco de dados:",
        error.message
        );
    }

    const deletedCustomer = this.customers.splice(index, 1)[0];

    await this.disconnect();
    return deletedCustomer;
    }
}
