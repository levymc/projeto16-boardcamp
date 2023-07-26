import CustomerDAO from "../database/dao/dao.customers.js"
import GamesDAO from "../database/dao/dao.games.js";
import RentalsDAO from "../database/dao/dao.rentals.js";


const dao = new RentalsDAO()
const gamesDao = new GamesDAO()
const customerDao = new CustomerDAO()


export async function checkIDs(req, res, next){
    try{
        const data = req.body
        const game = await gamesDao.readById(data.gameId)
        const customer = await customerDao.readById(data.customerId)

        if (!game || !customer || Number(data.daysRented) <= 0) return res.sendStatus(400)

        res.game = game

        next()

    }catch(err){
        console.error("Erro checkID rental:", err);
        res.status(500).send("Erro checkID aluguel.");
    }
}

export async function checkStock(req, res, next){
    try{
        const data = req.body
        const qntRentals = await dao.countByIdGame(data.gameId)
        // console.log(Number(qntRentals) === res.game.stockTotal)
        if (Number(qntRentals) === res.game.stockTotal) return res.sendStatus(400)

        next()
    }catch(err){
        console.error("Erro checkStock rental:", err);
        res.status(500).send("Erro checkStock aluguel.");
    }
}
