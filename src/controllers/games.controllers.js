import GamesORM from "../database/orm.games.js";

export async function getGames(req, res){
    const orm = new GamesORM()

    const itemById = await orm.read();
    console.log(itemById);

    res.send(itemById)
}