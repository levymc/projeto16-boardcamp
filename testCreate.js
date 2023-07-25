import ORM from "./src/database/orm.games.js";

// Exemplo de uso do ORM
const orm = new ORM();

// Criando alguns itens no banco de dados
const item1 = await orm.create({
  id: 1,
  name: 'Banco Imobiliário',
  image: 'http://example.com/banco_imobiliario.jpg',
  stockTotal: 3,
  pricePerDay: 1500,
});

const item2 = await orm.create({
  id: 2,
  name: 'Monopoly',
  image: 'http://example.com/monopoly.jpg',
  stockTotal: 5,
  pricePerDay: 1200,
});