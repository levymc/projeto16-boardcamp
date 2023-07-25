import ORM from "./src/database/orm.games.js";

// Exemplo de uso do ORM
const orm = new ORM();


const itemById = await orm.read();
console.log(itemById);

