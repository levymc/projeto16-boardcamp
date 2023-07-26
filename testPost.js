import axios from 'axios'


axios.post('http://localhost:5000/customers', {
    name: 'Vitorio',
    phone: '21998899222',
    cpf: '01234527890',
    birthday: '1992-10-25'
}).then(res =>{
    console.log(res.data)
}).catch(err => {
    console.log(err.response.data)
})



// axios.post('http://localhost:5000/games', {
//     name: 'Banco Imobiliário',
//     image: 'http://www.imagem.com.br/banco_imobiliario.jpg',
//     stockTotal: 3,
//     pricePerDay: 1500
//   }).then(res =>{
//     console.log(res.data)
// }).catch(err => {
//     console.log(err.response.data)
// })




