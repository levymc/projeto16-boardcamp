import conectDB from "../database.connection.js";

class Item {
    constructor(name, image, stockTotal, pricePerDay) {
        this.name = name;
        this.image = image;
        this.stockTotal = stockTotal;
        this.pricePerDay = pricePerDay;
    }
}

export default class GamesDAO {
    constructor() {
        this.pool = null
        this.items = []
    }
        
    async connect() {
        this.pool = await conectDB()
        console.log("Conexão!!!")
    }
    
    async disconnect() {
        if (this.pool) {
            await this.pool.end();
            console.log("Fechou...")
        }
    }
    
    async create(itemData) {
        await this.connect()
        const newItem = new Item(
            itemData.name,
            itemData.image,
            itemData.stockTotal,
            itemData.pricePerDay
        )

        const queryString = 'INSERT INTO public.games ("name", image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)'
        const values = [newItem.name, newItem.image, newItem.stockTotal, newItem.pricePerDay]
    
        try {
            await this.pool.query(queryString, values)
            console.log('Novo item adicionado ao banco de dados.')
        } catch (error) {
            console.error('Erro ao adicionar novo item ao banco de dados:', error.message)
        }
    
        this.items.push(newItem)
        await this.disconnect()
        return newItem
    }
    
    async read(limit = null, offset = null, order = null, desc = null) {
        await this.connect()

        let queryString = 'select * from public.games '
        if (order){
            queryString += 'order by ' + order
            if( desc === 'true' ) queryString += ' desc '
        }
        queryString += ' limit $1 offset $2 '
        console.log(queryString)
        const values = [limit, offset]
    
        try {
            const response = await this.pool.query(queryString, values)
            console.log('Consulta realizada com sucesso.')
            await this.disconnect()
            return response.rows || []
        } catch (error) {
            console.error('Erro ao consultar os itens no banco de dados:', error.message)
            await this.disconnect()
            return []
        }
    }

    async readById(id) {
        await this.connect()

        const queryString = `SELECT * from public.games WHERE "id" = $1`
        const value = [id]
        try {
            const response = await this.pool.query(queryString, value)
            console.log('Consulta realizada com sucesso.')
            await this.disconnect()
            return response.rows[0] || null
        } catch (error) {
            console.error('Erro ao consultar os itens no banco de dados:', error.message)
            await this.disconnect()
            return null
        }
    }

    async readByName(nome) {
        await this.connect()

        const queryString = `SELECT * from public.games WHERE "name" ilike '%${nome}%'`
        try {
            const response = await this.pool.query(queryString);
            console.log('Consulta realizada com sucesso.');
            await this.disconnect();
            return response.rows || [];
        } catch (error) {
            console.error('Erro ao consultar os itens no banco de dados:', error.message);
            await this.disconnect();
            return [];
        }
    }
    
    async update(id, itemData) {
        await this.connect();
    
        const itemToUpdate = this.items.find(item => item.id === id);
        if (!itemToUpdate) {
            await this.disconnect();
            return null; // Item não encontrado, retorna null
        }
    
        itemToUpdate.name = itemData.name || itemToUpdate.name;
        itemToUpdate.image = itemData.image || itemToUpdate.image;
        itemToUpdate.stockTotal = itemData.stockTotal || itemToUpdate.stockTotal;
        itemToUpdate.pricePerDay = itemData.pricePerDay || itemToUpdate.pricePerDay;
    
        const queryString = 'UPDATE public.games SET name = $1, image = $2, stockTotal = $3, pricePerDay = $4 WHERE id = $5';
        const values = [itemToUpdate.name, itemToUpdate.image, itemToUpdate.stockTotal, itemToUpdate.pricePerDay, id];
    
        try {
            await this.pool.query(queryString, values);
            console.log('Item atualizado no banco de dados.');
        } catch (error) {
            console.error('Erro ao atualizar o item no banco de dados:', error.message);
        }
    
        await this.disconnect();
        return itemToUpdate;
    }

    async delete(id) {
        await this.connect();
    
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            await this.disconnect();
            return null
        }

        const queryString = 'DELETE FROM public.games WHERE id = $1';
        const values = [id];
    
        try {
            await this.pool.query(queryString, values);
            console.log('Item excluído do banco de dados.');
        } catch (error) {
            console.error('Erro ao excluir o item do banco de dados:', error.message);
        }
    
        const deletedItem = this.items.splice(index, 1)[0];
    
        await this.disconnect();
        return deletedItem;
    }
    
  }
  