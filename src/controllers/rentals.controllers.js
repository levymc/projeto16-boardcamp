import RentalsDAO from "../database/dao/dao.rentals.js";
import { format, addDays } from 'date-fns';


const dao = new RentalsDAO()

export async function getRentals(req, res, next){
    const customerId = req.query.customerId
    const gameId = req.query.gameId
    console.log(gameId, customerId)
    try{
        if(customerId){
            const rentals = await dao.readWithJoinByCustomerID(customerId)
            res.rentals = rentals
            return next()
        }if(gameId){
            const rentals = await dao.readWithJoinByGameID(gameId)
            res.rentals = rentals
            return next()
        }
        const rentals = await dao.readWithJoin()
        res.rentals = rentals
        next()
        
    }catch (err) {
        console.error("Erro get rentals:", err);
        res.status(500).send("Erro aluguéis.");
    }
    
}

export async function formatRentals(req, res) {
    try {
        const rentals = res.rentals
        const formatedRentals = await Promise.all(rentals.map(async (rental) => {
            rental.customer = { id: rental.customerId, name: rental.customerName }
            rental.game = { id: rental.gameId, name: rental.gameName }
            rental.rentDate = format(new Date(rental.rentDate), 'yyyy-MM-dd');
            return rental
        }))
        // console.log(formatedRentals)
        res.send(formatedRentals);
    }catch (err) {
        console.error("Erro formatar rentals:", err);
        res.status(500).send("Erro ao formatar aluguéis.");
    }
}

export async function postRental(req, res){
    try{
        const data = req.body
        const game = res.game
        
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

export async function finalizeRental(req, res) {
    const id = req.params.id;
    const returnDate = format(new Date(), 'yyyy-MM-dd')
    try {
        const rental = await dao.readById(id)
        if (rental === null) return res.sendStatus(404)
        if (rental.returnDate != null) return res.sendStatus(400)

        const finalDate = format(addDays(rental.rentDate, rental.daysRented), 'yyyy-MM-dd')
        const priceDay = rental.originalPrice/rental.daysRented
        const delayFee = difDias(finalDate, returnDate) > 0 ? difDias(finalDate, returnDate) * priceDay : 0
        // console.log(difDias(finalDate, returnDate), priceDay)
        const newData = {
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: format(rental.rentDate, 'yyyy-MM-dd'),
            daysRented: rental.daysRented,
            returnDate: returnDate,
            originalPrice: rental.originalPrice,
            delayFee: delayFee,
        }
        // console.log(newData)
        const updatedData = await dao.update(id, newData)
        if (updatedData) {
            console.log("ATT: " + updatedData)
            res.sendStatus(200)
        } else {
            res.status(500).send("Erro ao atualizar aluguel.");
        }
    }catch (err) {
        console.error("Erro update rental:", err);
        res.status(500).send("Erro ao atualizar aluguel.");
    }
}

export async function deleteRental(req, res){
    const id = req.params.id
    try{
        console.log(id)
        const rental = await dao.readById(id)
        if (rental === null) return res.sendStatus(404)
        if (rental.returnDate === null) return res.sendStatus(400)

        console.log("aqui")

        const deletedData = await dao.delete(id)
        console.log(deletedData)
        if (deletedData) {
            console.log("Deleted: " + deletedData)
            res.sendStatus(200)
        } else {
            res.status(500).send("Erro ao deletar aluguel.");
        }

    }catch (err) {
        console.error("Erro delete rental:", err);
        res.status(500).send("Erro ao deletar aluguel.");
    }
}

function difDias(d1, d2){
    const data1 = new Date(d1)
    const data2 = new Date(d2)

    const dif = data2 - data1

    const dias = dif / (1000 * 60 * 60 * 24);

    return dias 
}

