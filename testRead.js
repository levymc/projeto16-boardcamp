import ORM from "./src/database/orm.games.js";

const orm = new ORM()


const itemById = await orm.read();
console.log(itemById);

