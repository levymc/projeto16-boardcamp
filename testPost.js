import axios from 'axios'


axios.post('http://localhost:5000/customers', {
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-25'
}).then(res =>{
    console.log(res.data)
}).catch(err => {
    console.log(err.response.data)
})


