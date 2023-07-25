import CustomerORM from "./src/database/orm.customers.js";
import GamesORM from "./src/database/orm.games.js";

// Exemplo de uso do ORM
// const orm = new GamesORM();
const orm = new CustomerORM()

// // Criando alguns itens no banco de dados
// const item1 = await orm.create({
//   name: 'Banco Imobiliário',
//   image: 'http://example.com/banco_imobiliario.jpg',
//   stockTotal: 3,
//   pricePerDay: 1500,
// });


await orm.create({
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
})
await orm.create({
    name: 'Maria Alfreda',
    phone: '21998899221',
    cpf: '12345678910',
    birthday: '1994-12-25'
})
