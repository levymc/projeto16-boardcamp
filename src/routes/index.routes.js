import { Router } from "express";
// import authRouter from "./auth.routes.js";
import { getGames } from "../controllers/games.controllers.js";


const router = Router();

// router.use(authRouter)
router.get('/games', getGames);


router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
})

export default router;