import RentalsDAO from "../database/dao/dao.rentals.js";
import CustomerDAO from "../database/dao/dao.customers.js"
import GamesDAO from "../database/dao/dao.games.js";

const dao = new RentalsDAO()
const gamesDao = new GamesDAO()
const customerDao = new CustomerDAO()

export async function getRentals(req, res, next){
    const rentals = await dao.readWithJoin()
    res.rentals = rentals
    next()
}

export async function formatRentals(req, res) {
    try {
        const rentals = res.rentals;
        const formatedRentals = await Promise.all(rentals.map(async (rental) => {
            rental.customer = { id: rental.customerId, name: rental.customerName };
            rental.game = { id: rental.gameId, name: rental.gameName };
            return rental;
        }))
        // console.log(formatedRentals)
        res.send(formatedRentals);
    } catch (error) {
        console.error("Erro ao formatar aluguéis:", error);
        res.status(500).send("Erro ao formatar aluguéis.");
    }
  }
  