import conectDB from "../database.connection.js";

class Customer {
    constructor(name, phone, cpf, birthday) {
        this.name = name;
        this.phone = phone;
        this.cpf = cpf;
        this.birthday = birthday;
    }
}
    
export default class CustomerDAO{
    constructor() {
        this.pool = null;
        this.customers = [];
    }

    async connect() {
        this.pool = await conectDB();
        console.log("Conexão!!!")
    }

    async disconnect() {
    if (this.pool) {
        await this.pool.end();
        console.log("Fechou...");
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

    async read(limit = null, offset = null, order = null, desc = null){
        await this.connect();

        let queryString = 'select * from public.customers '
        if (order){
            queryString += 'order by ' + order
            if( desc === 'true' ) queryString += ' desc '
        }
        queryString += ' limit $1 offset $2 '
        console.log(queryString)
        const values = [limit, offset]
        try {
            const response = await this.pool.query(queryString, values)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows || []
        } catch (error) {
            console.error(
            "Erro ao consultar os clientes no banco de dados:",
            error.message
            );
            await this.disconnect();
            return [];
        }
    }

    async readById(id){
        await this.connect()
        const queryString = `SELECT * FROM public.customers where "id" = $1`
        const values = [id]
        try {
            const response = await this.pool.query(queryString, values)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows[0] || null
        } catch (error) {
            console.error("Erro consulta por id: ", error.message);
            await this.disconnect();
            return null;
        }   
    }

    async readByCPF(cpf){
        await this.connect()
        const queryString = `SELECT * FROM public.customers where "cpf" = $1`
        const values = [cpf]
        try {
            const response = await this.pool.query(queryString, values)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows[0] || null
        } catch (error) {
            console.error("Erro consulta por id: ", error.message);
            await this.disconnect();
            return null;
        }
    }

    async readIlikeCPF(cpf){
        await this.connect()
        const queryString = `SELECT * FROM public.customers where "cpf" ilike '%${cpf}%'`
        try {
            const response = await this.pool.query(queryString)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows || null
        } catch (error) {
            console.error("Erro consulta por id: ", error.message);
            await this.disconnect();
            return null;
        }
    }

    async update(id, customerData) {
        await this.connect();

        const queryString = `update     
                                public.customers 
                            set 
                                name = $1, phone = $2, cpf = $3, birthday = $4 
                            where 
                                id = $5`
        const values = [
          customerData.name,
          customerData.phone,
          customerData.cpf,
          customerData.birthday,
          id,
        ]
    
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
        return true
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
