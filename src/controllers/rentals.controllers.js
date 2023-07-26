import RentalsDAO from "../database/dao/dao.rentals.js";
import CustomerDAO from "../database/dao/dao.customers.js"
import GamesDAO from "../database/dao/dao.games.js";

const dao = new RentalsDAO()
const gamesDao = new GamesDAO()
const customerDao = new CustomerDAO()

export async function getRentals(req, res, next){
    const rentals = await dao.read()
    console.log(rentals)
    res.rentals = rentals
    next()
}

export async function formatRentals(req, res) {
    try {
        const rentals = res.rentals;
        const formatedRentals = await Promise.all(rentals.map(async (rental) => {
            const customer = await customerDao.readById(rental.customerId);
            const game = await gamesDao.readById(rental.gameId); // Corrigir o parâmetro aqui
    
            rental.customer = { id: customer.id, name: customer.name };
            rental.game = { id: game.id, name: game.name };
    
            return rental;
        }));
        console.log(formatedRentals)
        res.send(formatedRentals);
    } catch (error) {
        console.error("Erro ao formatar aluguéis:", error);
        res.status(500).send("Erro ao formatar aluguéis.");
    }
  }
  