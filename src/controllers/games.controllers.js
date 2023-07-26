import GamesORM from "../database/orm.games.js";

const orm = new GamesORM()

export async function getGames(req, res){
    const itens = await orm.read();
    // console.log(itemById);

    res.send(itens)
}

export async function postGames(req, res){
    const data = req.body

    const checkName = await orm.readByName(req.body.name)

    console.log("AQUI ",checkName)

    if (checkName.length != 0) return res.status(409).send("O nome inserido já existe!")

    const item = await orm.create(data)
    console.log(item)
    res.status(201).send(item)
}