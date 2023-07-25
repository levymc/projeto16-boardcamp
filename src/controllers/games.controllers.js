import GamesORM from "../database/orm.games.js";

export async function getGames(req, res){
    const orm = new GamesORM()

    const itemById = await orm.read();
    console.log(itemById);

    res.send(itemById)
}

export async function postGames(req, res){
    const data = req.body
    const orm = new GamesORM()
    const item = await orm.create(data)
    console.log(item)
    res.send(item)
}