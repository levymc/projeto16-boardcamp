import GamesDAO from "../database/dao/dao.games.js";

const dao = new GamesDAO()

export async function getGames(req, res) {
    const paramName = req.query.name
    const offset = req.query.offset
    const limit = req.query.limit
    const order = req.query.order
    const desc = req.query.desc
    try {
        if (paramName){
            const itens = await dao.readByName(paramName)
            return res.send(itens)
        }
        const itens = await dao.read(limit, offset, order, desc)
        return res.send(itens)
        
    } catch (err) {
        console.error("Erro get games:", err)
        return res.status(500).send("Erro games.")
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
    console.log("Aquii")
    const paramName = req.query.name
    console.log(paramName)
}