import pkg from 'pg';
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

export default async function conectDB(){
     const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
     })
     
     try {
          const client = await pool.connect();
          // console.log("PostgreSQL database is connected");
          client.release()
          } catch (error) {
          console.error("Error connecting to PostgreSQL database:", error.message);
     }
     return pool
}


