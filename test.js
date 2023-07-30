import pkg from 'pg';
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
}  
if (process.env.NODE_ENV === "production") configDatabase.ssl = true

const pool = new Pool(configDatabase)

try {
    const client = await pool.connect();
    // console.log("PostgreSQL database is connected");
    client.release()
    const data = await pool.query(`
        select * from public.games
    `)
    console.log(data.rows)
} catch (error) {
    console.error("Error connecting to PostgreSQL database:", error.message);
}









// import { format, addDays } from 'date-fns';

// const initialDate = new Date('2021-06-20')
// const finalDate = format(addDays(initialDate, 3), 'yyyy-MM-dd')

// console.log(finalDate);


// const d1 = format(new Date('2021-06-20'), 'yyyy-MM-dd');
// const d2 = format(new Date(), 'yyyy-MM-dd');

// const data1 = new Date('2000-07-30');
// const data2 = new Date(d1);

// const dif = data2 - data1

// const dias = dif / (1000 * 60 * 60 * 24);

// console.log(dias + " dias");
// console.log(data2 / (1000 * 60 * 60 * 24) + 3)

