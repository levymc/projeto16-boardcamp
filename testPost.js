import axios from 'axios'


axios.post('http://localhost:5000/customers', {
    name: 'Levy',
    phone: '16997350060',
    cpf: '42700467833',
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




