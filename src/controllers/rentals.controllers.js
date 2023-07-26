import RentalsDAO from "../database/dao/dao.rentals.js";
import CustomerDAO from "../database/dao/dao.customers.js"
import GamesDAO from "../database/dao/dao.games.js";
import { format } from 'date-fns';


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
            rental.customer = { id: rental.customerId, name: rental.customerName }
            rental.game = { id: rental.gameId, name: rental.gameName }
            rental.rentDate = format(new Date(rental.rentDate), 'yyyy-MM-dd');
            return rental
        }))
        // console.log(formatedRentals)
        res.send(formatedRentals);
    } catch (err) {
        console.error("Erro formatar rentals:", err);
        res.status(500).send("Erro ao formatar aluguéis.");
    }
}


export async function postRental(req, res){
    try{
        const data = req.body
        const game = await gamesDao.readById(data.gameId)

        data.rentDate = format(new Date(), 'yyyy-MM-dd')
        data.returnDate = null
        data.daysRented = Number(data.daysRented)
        data.delayFee = null
        data.originalPrice = game.pricePerDay * data.daysRented

        const insertedData = await dao.create(data)
        if (insertedData) return res.sendStatus(201)
    }catch(err){
        console.error("Erro insert rental:", err);
        res.status(500).send("Erro ao inserir aluguel.");
    }
    
}