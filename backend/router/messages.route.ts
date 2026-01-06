import express from 'express'
import { pool } from '../config/db'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * from messages ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error in messages route");
    }
})

export default router;