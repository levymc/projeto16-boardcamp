import GamesDAO from "../database/dao/dao.games.js";

const dao = new GamesDAO()

export async function getGames(req, res){
    try{
        const itens = await dao.read()
        res.send(itens)
    }catch (err) {
        console.error("Erro get games:", err);
        res.status(500).send("Erro games.");
    }
   
}

export async function postGames(req, res){
    try{
        const data = req.body

        const checkName = await dao.readByName(req.body.name)
    
        console.log("AQUI ",checkName)
    
        if (checkName.length != 0) return res.status(409).send("O nome inserido já existe!")
    
        const item = await dao.create(data)
        console.log(item)
        res.status(201).send(item)
    }catch (err) {
        console.error("Erro post games:", err);
        res.status(500).send("Erro games.");
    }
}

export async function getGameByName(req, res){
    
}