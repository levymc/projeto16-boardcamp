import { Router } from "express";
// import authRouter from "./auth.routes.js";
import { getGames, postGames } from "../controllers/games.controllers.js"
import { getCustomers, getCustomerById, postCustomer, updateCustomer } from "../controllers/customers.controllers.js";
import { getRentals, formatRentals, postRental, finalizeRental, deleteRental } from "../controllers/rentals.controllers.js";
import { checkIDs, checkStock } from "../middlewares/validateRental.js";
import { validateCPF, validateCPF2 } from "../middlewares/validateCPF.js";
import validateSchema from "../middlewares/validateSchema.js";
import itemSchema from "../schemas/item.schema.js";
import customerSchema from "../schemas/customer.schema.js";



const router = Router();

// router.use(authRouter)
router.get('/games', getGames);
router.post('/games', (req, res, next) => { validateSchema(req, res, next, itemSchema) }, postGames)

router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomerById)
router.post('/customers', (req, res, next) => { validateSchema(req, res, next, customerSchema) }, validateCPF, postCustomer)
router.put('/customers/:id', (req, res, next) => { validateSchema(req, res, next, customerSchema) }, validateCPF2, updateCustomer)

router.get('/rentals', getRentals, formatRentals)
router.post('/rentals', checkIDs, checkStock, postRental)
router.post('/rentals/:id/return', finalizeRental)
router.delete('/rentals/:id', deleteRental)

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
})

export default router;