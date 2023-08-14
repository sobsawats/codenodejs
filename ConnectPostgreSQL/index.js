const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, "development.env")
});

const { Pool, Client } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

(async () => {
    const client = await pool.connect();
    try {
        // const response = await client.query("SELECT current_user");    
        const response = await pool.query("SELECT current_user");         
        const {rows} = response;
        const currentUser = rows[0]['current_user'];
        // console.log(currentUser+" with client");  // postgres        
        console.log(currentUser+" with pool");  // postgres
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
})();
