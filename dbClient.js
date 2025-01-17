import pkg from 'pg';
const { Client } = pkg;
import { configDotenv } from 'dotenv';


configDotenv();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));


export default client;
