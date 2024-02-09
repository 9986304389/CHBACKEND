const { Pool } = require('pg');

// Replace the URL with your ElephantSQL database URL
const connectionString = 'postgres://imfhhxyp:1gBfqjymgT1l1pHd8roawKbljUrAMmtn@tiny.db.elephantsql.com:5432/imfhhxyp';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
