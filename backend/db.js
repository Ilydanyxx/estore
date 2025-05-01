import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgres://postgres:Chuyko2005danya@localhost:5432/estore'
});

export default pool;

