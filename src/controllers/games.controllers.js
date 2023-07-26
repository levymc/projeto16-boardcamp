import GamesDAO from "../database/dao/dao.games.js";

const dao = new GamesDAO()

export async function getGames(req, res){
    const itens = await dao.read();
    // console.log(itemById);

    res.send(itens)
}

export async function postGames(req, res){
    const data = req.body

    const checkName = await dao.readByName(req.body.name)

    console.log("AQUI ",checkName)

    if (checkName.length != 0) return res.status(409).send("O nome inserido já existe!")

    const item = await dao.create(data)
    console.log(item)
    res.status(201).send(item)
}