import {neon} from "@neondatabase/serverless"
import "dotenv/config";
//create a sql connection using db url
export const sql=neon(process.env.DATABASE_URL)
export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        tittle VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE

        
        
        
        )`;
    console.log("database initialized successfully");
  } catch (error) {
    console.log("error initialzing DB", error);
    process.exit(1); 
  }
}