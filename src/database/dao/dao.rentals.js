import conectDB from "../database.connection.js";

class Rental {
    constructor(id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) {
      this.id = id;
      this.customerId = customerId;
      this.gameId = gameId;
      this.rentDate = rentDate;
      this.daysRented = daysRented;
      this.returnDate = returnDate;
      this.originalPrice = originalPrice;
      this.delayFee = delayFee;
    }
}
  
export default class RentalsDAO {
    constructor() {
        this.pool = null;
        this.rentals = [];
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
  
    async create(rentalData) {
        await this.connect();
        const newRental = new Rental(
            rentalData.id,
            rentalData.customerId,
            rentalData.gameId,
            rentalData.rentDate,
            rentalData.daysRented,
            rentalData.returnDate,
            rentalData.originalPrice,
            rentalData.delayFee
        );
    
        const queryString ='INSERT INTO public.rentals (id, "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            newRental.id,
            newRental.customerId,
            newRental.gameId,
            newRental.rentDate,
            newRental.daysRented,
            newRental.returnDate,
            newRental.originalPrice,
            newRental.delayFee,
        ];
    
        try {
            await this.pool.query(queryString, values);
            console.log("Novo aluguel adicionado ao banco de dados.");
        } catch (error) {
            console.error("Erro ao adicionar novo aluguel ao banco de dados:", error.message);
        }
    
        this.rentals.push(newRental);
        await this.disconnect();
        return newRental;
    }
  
    async read() {
        await this.connect();
    
        const queryString = 'SELECT * FROM public.rentals';
    
        try {
            const response = await this.pool.query(queryString);
            console.log("Consulta realizada com sucesso.");
            await this.disconnect();
            return response.rows || [];
        } catch (error) {
            console.error("Erro ao consultar os aluguéis no banco de dados:", error.message);
            await this.disconnect();
            return [];
        }
    }
  
    async update(id, rentalData) {
        await this.connect();
    
        const rentalToUpdate = this.rentals.find((rental) => rental.id === id);
        if (!rentalToUpdate) {
            await this.disconnect();
            return null; // Aluguel não encontrado, retorna null
        }
    
        rentalToUpdate.customerId = rentalData.customerId || rentalToUpdate.customerId;
        rentalToUpdate.gameId = rentalData.gameId || rentalToUpdate.gameId;
        rentalToUpdate.rentDate = rentalData.rentDate || rentalToUpdate.rentDate;
        rentalToUpdate.daysRented = rentalData.daysRented || rentalToUpdate.daysRented;
        rentalToUpdate.returnDate = rentalData.returnDate || rentalToUpdate.returnDate;
        rentalToUpdate.originalPrice = rentalData.originalPrice || rentalToUpdate.originalPrice;
        rentalToUpdate.delayFee = rentalData.delayFee || rentalToUpdate.delayFee;
    
        const queryString =
            'UPDATE public.rentals SET "customerId" = $1, "gameId" = $2, "rentDate" = $3, "daysRented" = $4, "returnDate" = $5, "originalPrice" = $6, "delayFee" = $7 WHERE id = $8';
        const values = [
            rentalToUpdate.customerId,
            rentalToUpdate.gameId,
            rentalToUpdate.rentDate,
            rentalToUpdate.daysRented,
            rentalToUpdate.returnDate,
            rentalToUpdate.originalPrice,
            rentalToUpdate.delayFee,
            id,
        ];
    
        try {
            await this.pool.query(queryString, values);
            console.log("Aluguel atualizado no banco de dados.");
        } catch (error) {
            console.error("Erro ao atualizar o aluguel no banco de dados:", error.message);
        }
    
        await this.disconnect();
        return rentalToUpdate;
    }
  
    async delete(id) {
        await this.connect();
    
        const index = this.rentals.findIndex((rental) => rental.id === id);
        if (index === -1) {
            await this.disconnect();
            return null;
        }
    
        const queryString = 'DELETE FROM public.rentals WHERE id = $1';
        const values = [id];
    
        try {
            await this.pool.query(queryString, values);
            console.log("Aluguel excluído do banco de dados.");
        } catch (error) {
            console.error("Erro ao excluir o aluguel do banco de dados:", error.message);
        }
    
        const deletedRental = this.rentals.splice(index, 1)[0];
    
        await this.disconnect();
        return deletedRental;
    }
  }
  