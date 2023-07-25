import GamesORM from "./src/database/orm.games.js";

const orm = new GamesORM()


const itemById = await orm.readByName("Batalha Naval");
console.log(itemById);

// console.log