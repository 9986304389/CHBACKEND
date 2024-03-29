const express = require('express');
const { Pool } = require('pg');
const serverless = require('serverless-http');
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3001;
const save_user_login = require('./router/user_login_router');
const helmet = require("helmet");


// Replace the URL with your ElephantSQL database URL
const connectionString = 'postgres://imfhhxyp:1gBfqjymgT1l1pHd8roawKbljUrAMmtn@tiny.db.elephantsql.com:5432/imfhhxyp';

const pool = new Pool({
  connectionString: connectionString,
});

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req);
  next();
});

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "20mb", parameterLimit: "5000" })
);

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

app.use('/api', save_user_login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



//module.exports.handler = serverless(app);