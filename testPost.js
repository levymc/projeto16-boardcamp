import axios from 'axios'
import dayjs from 'dayjs'
// import ORM from './src/middlewares/orm.js'
// import { db } from './src/database/database.connection.js';
import { MongoClient, ObjectId } from "mongodb";

axios.post('http://localhost:5000/send-mail', {
    nome: "Gol",
    marca: "Volkswagen",
    modelo: "Gol",
    ano: 2010,
    km: 100000,
    qntDonos: 2,
    infoExtra: "Sofreu apenas um acidente, mas o carro concertou e funciona perfeitamente",
    valor: 35000,
    insertedDate: dayjs().format('DD/MM/YYYY HH:mm:s'),
    createdBy: "id do usuário que tava logado e que inseriu"}).then(res =>{
    console.log(res.data)
}).catch(err => {
    console.log(err.response.data)
})


// const orm = new ORM(db);

// const insert = async () => {
//   await orm.create('teste', { nome: 'Levy' });
// }


// try {
//   await db.collection("carros").insertMany([{titulo: 'Corsa Active',
//       marca: 'GM',
//       km: '100000',
//       ano: '2010',
//       diaria: '100',
//       localizacao: 'RJ',
//       img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_TlmyhaXoMgflHYPUy0pvrP2V2gTgQIwPw&usqp=CAU',
//       infoExtra: ''
//     },
//     {
//       titulo: 'Gol G5',
//       marca: 'Volks',
//       km: '205000',
//       ano: '2015',
//       diaria: '120',
//       localizacao: 'Ribeirão Preto',
//       img: 'https://s2-autoesporte.glbimg.com/Uh5F1TVpBhmIglL0noh-GVqOSCI=/0x0:3150x2100/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/l/b/X1FGjCQ2Kgz4kiUksuJw/primeiro-volkswagen-gol.jpeg',
//       infoExtra: ''
//     },
//     {
//       titulo: '208 Active',
//       marca: 'Pegeout',
//       km: '50000',
//       ano: '2018',
//       diaria: '150',
//       localizacao: 'SP',
//       img: 'https://www.peugeot.com.br/content/dam/peugeot/products/1ppa/a5d4i5gc2pb/5/2023/page/profile.png',
//       infoExtra: ''
//     },
//     {
//       titulo: 'BMW 320i',
//       marca: 'BMW',
//       km: '80000',
//       ano: '2020',
//       diaria: '400',
//       localizacao: 'SP',
//       img: 'https://cdn.motor1.com/images/mgl/xqZJ9G/686:0:4094:3072/bmw-320i-m-sport-2023.webp',
//       infoExtra: ''
//     },
//     {
//       titulo: 'Corsa Active',
//       marca: 'GM',
//       km: '100000',
//       ano: '2010',
//       diaria: '100',
//       localizacao: 'RJ',
//       img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_TlmyhaXoMgflHYPUy0pvrP2V2gTgQIwPw&usqp=CAU',
//       infoExtra: 'O carro já sofreu um acidente no passado, mas foi completamente reparado.'
//     },
//     {
//       titulo: 'Gol Trend',
//       marca: 'Volkswagen',
//       km: '80000',
//       ano: '2012',
//       diaria: '90',
//       localizacao: 'SP',
//       img: 'https://cdn.autopapo.com.br/box/uploads/2023/01/31220335/volkswagen-gol-trend-2008-prata-frente-parado.jpg',
//       infoExtra: 'Único dono, possui histórico completo de revisões e está com a pintura em perfeito estado.'
//     },
//     {
//       titulo: 'Fiesta Sedan',
//       marca: 'Ford',
//       km: '60000',
//       ano: '2015',
//       diaria: '120',
//       localizacao: 'RJ',
//       img: 'https://www.webmotors.com.br/wp-content/uploads/2018/02/09224207/940x576_c67f3f34-9365-440e-9a4f-69f8d02749e4_2.jpg',
//       infoExtra: 'Carro de único dono, possui ar condicionado e vidros elétricos.'
//     },
//     {
//       titulo: 'Onix LT',
//       marca: 'GM',
//       km: '40000',
//       ano: '2019',
//       diaria: '150',
//       localizacao: 'MG',
//       img: 'https://www.comprecar.com.br/storage/news/featured/uU_8_ZPCB67El1Q.jpg',
//       infoExtra: 'Este veículo possui sistema de som integrado e é equipado com direção elétrica.'
//     },
//     {
//       titulo: 'Cruze LTZ',
//       marca: 'Chevrolet',
//       km: '20000',
//       ano: '2021',
//       diaria: '200',
//       localizacao: 'SP',
//       img: 'https://quatrorodas.abril.com.br/wp-content/uploads/2021/01/Chevrolet_Cruze_LTZ-e1611234974609.jpg?quality=70&strip=info&w=1280&h=720&crop=1',
//       infoExtra: 'Carro de luxo com bancos de couro e sistema de navegação GPS.'
//     },
//     {
//       titulo: 'HB20 Comfort',
//       marca: 'Hyundai',
//       km: '50000',
//       ano: '2017',
//       diaria: '110',
//       localizacao: 'RJ',
//       img: 'https://s2-autoesporte.glbimg.com/qTwNR7aE0kjQqk_tYOn10TG2e-g=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/m/B/ahJk2CTwiZ267GMGD03g/2015-12-09-hb20-comfort-plus-3-4-frente-20787-03-bege-2.jpg',
//       infoExtra: 'O carro está equipado com câmbio automático e sensor de estacionamento.'
//     },
//     {
//       titulo: 'Voyage Trendline',
//       marca: 'Volkswagen',
//       km: '70000',
//       ano: '2014',
//       diaria: '100',
//       localizacao: 'MG',
//       img: "https://combustivel.app/imgs/t650/consumo-voyage-trendline-1-0-3.jpg",
//       infoExtra: 'Possui travas elétricas e alarme. Ótimo custo-benefício.'
//     },
//     {
//       titulo: 'Fiat Uno',
//       marca: 'Fiat',
//       km: '90000',
//       ano: '2013',
//       diaria: '80',
//       localizacao: 'SP',
//       img: 'https://s2-autoesporte.glbimg.com/eR5mRr74YzAa0YGcOJQxKAH0y4c=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/w/1/nrsDdXTpSRnonpdBJERA/2015-03-19-uno2.png',
//       infoExtra: 'Carro econômico, perfeito para uso urbano. Ideal para quem busca baixo consumo de combustível.'
//     },
//     {
//       titulo: 'Renegade Sport',
//       marca: 'Jeep',
//       km: '30000',
//       ano: '2018',
//       diaria: '180',
//       localizacao: 'RJ',
//       img: 'https://garagem360.com.br/wp-content/uploads/2023/05/Jeep-Renegade-Sport-2023-1.jpg',
//       infoExtra: 'Carro robusto e seguro, perfeito para aventuras off-road.'
//     },
//     {
//       titulo: 'Civic EXR',
//       marca: 'Honda',
//       km: '10000',
//       ano: '2022',
//       diaria: '250',
//       localizacao: 'MG',
//       img: 'https://autoentusiastas.com.br/ae/wp-content/uploads/2015/02/DSC01735-cort.jpg',
//       infoExtra: 'Carro de alto padrão, equipado com teto solar panorâmico e bancos em couro.'
//     },
//     {
//       titulo: 'Cobalt LTZ',
//       marca: 'Chevrolet',
//       km: '45000',
//       ano: '2016',
//       diaria: '130',
//       localizacao: 'SP',
//       img: 'https://1.bp.blogspot.com/-jN-wnisO0Us/XRT_3DxzRBI/AAAAAAAABag/xfr9jubesP8FxN6FwVZ7mC3_DHbIMPjPwCLcBGAs/s1600/Novo-Cobalt-20-20%2B%25283%2529.jpg',
//       infoExtra: 'Carro espaçoso, ideal para viagens em família. Possui controle de estabilidade.'
//     },
//     {
//       titulo: 'Palio Fire',
//       marca: 'Fiat',
//       km: '120000',
//       ano: '2009',
//       diaria: '70',
//       localizacao: 'RJ',
//       img: 'https://s2-autoesporte.glbimg.com/ZZe7MN1m6t91yIbao37pKjkh67s=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/X/a/mObToPRTmoZCbQzgvAOA/2015-01-06-fiat-palio-fire.jpg',
//       infoExtra: 'Este veículo possui direção hidráulica e é econômico em termos de consumo de combustível.'
//     },
//     {
//       titulo: 'Focus Titanium',
//       marca: 'Ford',
//       km: '55000',
//       ano: '2015',
//       diaria: '150',
//       localizacao: 'MG',
//       img: 'https://s2-autoesporte.glbimg.com/UnecLLX9ZWASCrY3SR0ksdUxeaY=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/A/6/ZROgqdSNm2QJeFg5JvKw/2015-06-22-autoesporte-focus-07-1.jpg',
//       infoExtra: 'Carro de luxo, com bancos de couro, câmbio automático e sistema de som premium.'
//     },
//     {
//       titulo: 'Corolla XEI',
//       marca: 'Toyota',
//       km: '25000',
//       ano: '2020',
//       diaria: '200',
//       localizacao: 'SP',
//       img: 'https://1.bp.blogspot.com/-xsUmUNubQUE/XVMKROOYvqI/AAAAAAAACR8/kcI0rSp0SEI32Y0fO3aPC__S_8qSfVxtQCLcBGAs/s1600/Novo-Toyota-Corolla-XEi-2020%2B%25282%2529.jpg',
//       infoExtra: 'Carro de alto nível, com câmbio CVT, sistema de navegação GPS e controle de tração.'
//     },
//     {
//       titulo: 'HB20S Premium',
//       marca: 'Hyundai',
//       km: '35000',
//       ano: '2017',
//       diaria: '120',
//       localizacao: 'RJ',
//       img: 'https://s2-autoesporte.glbimg.com/qTwNR7aE0kjQqk_tYOn10TG2e-g=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/m/B/ahJk2CTwiZ267GMGD03g/2015-12-09-hb20-comfort-plus-3-4-frente-20787-03-bege-2.jpg',
//       infoExtra: 'Este veículo possui ar condicionado digital, retrovisores elétricos e sensor de chuva.'
//     },
//     {
//       titulo: 'Renault Kwid',
//       marca: 'Renault',
//       km: '15000',
//       ano: '2021',diaria: '100',localizacao: 'MG',img: 'https://brfrance.com.br/uploads/products/versions/colors/kwid-2022-intense-05.png',infoExtra: 'Carro compacto e econômico, perfeito para a cidade. Possui central multimídia.'}])
// }catch(err){
//   console.error(err)
// }