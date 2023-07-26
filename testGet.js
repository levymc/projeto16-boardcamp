import axios from 'axios'

// axios.get('http://localhost:5000/games').then(res => {
//     console.log(res.data)
// }).catch(err => {
//     console.log(err)
// })

axios.get('http://localhost:5000/customers/3').then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err.response.data)
})