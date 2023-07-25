import { Router } from "express";
// import authRouter from "./auth.routes.js";
import { getGames, postGames } from "../controllers/games.controllers.js"
import { getCustomers } from "../controllers/customers.controllers.js";
import validateItem from "../middlewares/validateItem.js";


const router = Router();

// router.use(authRouter)
router.get('/games', getGames);
router.post('/games', validateItem, postGames)

router.get('/customers', getCustomers)

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
})

export default router;