import GamesORM from "../database/orm.games.js";

const orm = new GamesORM()

export async function getGames(req, res){
    const itemById = await orm.read();
    console.log(itemById);

    res.send(itemById)
}

export async function postGames(req, res){
    const data = req.body
    const item = await orm.create(data)
    console.log(item)
    res.send(item)
}