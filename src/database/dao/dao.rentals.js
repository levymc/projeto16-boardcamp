import conectDB from "../database.connection.js";

class Rental {
    constructor(customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) {
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
        console.log("Conexão!!");
    }
  
    async disconnect() {
        if (this.pool) {
            await this.pool.end();
        }
    }
  
    async create(rentalData) {
        await this.connect();
        const newRental = new Rental(
            rentalData.customerId,
            rentalData.gameId,
            rentalData.rentDate,
            rentalData.daysRented,
            rentalData.returnDate,
            rentalData.originalPrice,
            rentalData.delayFee
        );
    
        const queryString =`
                INSERT INTO public.rentals ("customerId", "gameId", "rentDate", 
                "daysRented", "returnDate", "originalPrice", "delayFee") 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                `
        const values = [
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
    
        this.rentals.push(newRental)
        await this.disconnect()
        return newRental
    }

    async countByIdGame(gameId){
        await this.connect()

        const queryString = `select count(*) from public.rentals where "gameId" = $1`
        const value = [gameId]

        try {
            const response = await this.pool.query(queryString, value)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows[0].count || null
        } catch (error) {
            console.error("Erro rentals:", error.message)
            await this.disconnect()
            return null
        }
    }
  
    async read() {
        await this.connect()
    
        const queryString = 'select * from public.rentals'
    
        try {
            const response = await this.pool.query(queryString)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows || []
        } catch (error) {
            console.error("Erro rentals:", error.message)
            await this.disconnect()
            return []
        }
    }

    async readById(id){
        await this.connect()
        const queryString = `SELECT * FROM public.rentals where "id" = $1`
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

    async readWithJoin(){
        await this.connect()

        const queryString = `
                SELECT r.*, c."name" AS "customerName", g."name" AS "gameName"
                FROM public.rentals r
                JOIN public.customers c ON r."customerId" = c."id"
                JOIN public.games g ON r."gameId" = g."id"; 
                ` //UHUUUUU kraio

        try {
            const response = await this.pool.query(queryString)
            console.log("Consulta realizada com sucesso.")
            await this.disconnect()
            return response.rows || []
        } catch (error) {
            console.error("Erro rentals JOIN:", error.message)
            await this.disconnect()
            return []
        }
    }
  
    async update(id, rentalData) {
        await this.connect();
        const queryString =`update 
                                public.rentals 
                            set 
                                "customerId" = $1, "gameId" = $2, "rentDate" = $3, "daysRented" = $4, "returnDate" = $5, "originalPrice" = $6, "delayFee" = $7 
                            where 
                                id = $8`
        const values = [
          rentalData.customerId,
          rentalData.gameId,
          rentalData.rentDate,
          rentalData.daysRented,
          rentalData.returnDate,
          rentalData.originalPrice,
          rentalData.delayFee,
          id,
        ];
    
        try {
            await this.pool.query(queryString, values);
            console.log("Aluguel atualizado!");
        } catch (error) {
            console.error("Erro update rentals:", error.message);
        }
    
        await this.disconnect();
        return rentalData;
    }
  
    async delete(id) {
        await this.connect()
    
        const queryString = 'delete from public.rentals where id = $1'
        const values = [id]
    
        try {
            await this.pool.query(queryString, values)
            console.log("Aluguel excluído do banco de dados.")
        } catch (error) {
            console.error("Erro delete rental: ", error.message)
            return false
        }
    
        await this.disconnect()
        return true
    }
      
  }
  