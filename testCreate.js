import GamesORM from "./src/database/orm.games.js";

// Exemplo de uso do ORM
const orm = new GamesORM();

// Criando alguns itens no banco de dados
const item1 = await orm.create({
  name: 'Banco Imobiliário',
  image: 'http://example.com/banco_imobiliario.jpg',
  stockTotal: 3,
  pricePerDay: 1500,
});
