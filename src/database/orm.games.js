import conectDB from "./database.connection.js";

class Item {
    constructor(id, name, image, stockTotal, pricePerDay) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.stockTotal = stockTotal;
      this.pricePerDay = pricePerDay;
    }
  }

export default class ORM {
    constructor() {
        this.pool = null
        this.items = []
    }
        
    async connect() {
        this.pool = await conectDB()
        console.log("Conexão com o banco de dados estabelecida.");
    }
    
    async disconnect() {
        if (this.pool) {
            await this.pool.end();
            console.log("Conexão com o banco de dados encerrada.");
        }
    }
    
    async create(itemData) {
        await this.connect();
        const newItem = new Item(
            itemData.id,
            itemData.name,
            itemData.image,
            itemData.stockTotal,
            itemData.pricePerDay
        );

        const queryString = 'INSERT INTO public.games (id, name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4, $5)';
        const values = [newItem.id, newItem.name, newItem.image, newItem.stockTotal, newItem.pricePerDay];
    
        try {
            await this.pool.query(queryString, values);
            console.log('Novo item adicionado ao banco de dados.');
        } catch (error) {
            console.error('Erro ao adicionar novo item ao banco de dados:', error.message);
        }
    
        this.items.push(newItem)
        await this.disconnect()
        return newItem
    }
    
    async read() {
        await this.connect();
    
        const queryString = 'SELECT * FROM public.games';
    
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
    
        // Método para atualizar um item no banco de dados
        async update(id, itemData) {
        await this.connect();
        const itemToUpdate = this.items.find(item => item.id === id);
        if (itemToUpdate) {
            itemToUpdate.name = itemData.name || itemToUpdate.name;
            itemToUpdate.image = itemData.image || itemToUpdate.image;
            itemToUpdate.stockTotal = itemData.stockTotal || itemToUpdate.stockTotal;
            itemToUpdate.pricePerDay = itemData.pricePerDay || itemToUpdate.pricePerDay;
        }
        await this.disconnect();
        return itemToUpdate || null;
        }
    
        // Método para deletar um item do banco de dados pelo ID
        async delete(id) {
        await this.connect();
        const index = this.items.findIndex(item => item.id === id);
        const deletedItem = index !== -1 ? this.items.splice(index, 1)[0] : null;
        await this.disconnect();
        return deletedItem;
        }
  }
  