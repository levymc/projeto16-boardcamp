import { Router } from "express";
// import authRouter from "./auth.routes.js";


const router = Router();

// router.use(authRouter)
router.post('/cadastro');


router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
})

export default router;