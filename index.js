const express = require('express');
const { Pool } = require('pg');
const serverless = require('serverless-http');
const app = express();
const port = 3001;

// Replace the URL with your ElephantSQL database URL
const connectionString = 'postgres://imfhhxyp:1gBfqjymgT1l1pHd8roawKbljUrAMmtn@tiny.db.elephantsql.com:5432/imfhhxyp';

const pool = new Pool({
  connectionString: connectionString,
});

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_login');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/', async (req, res) => {
    try {

        res.json("hello");
    } catch (error) {
        console.error('Error executing SQL query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//module.exports.handler = serverless(app);