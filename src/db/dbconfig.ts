import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cockmanager',
    password: 'ERIKpro02',
    port: 5432,
});

export default pool;

