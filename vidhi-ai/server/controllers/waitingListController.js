const pool = require('../db');

const getWaitingList = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT wl.*, p.name as patient_name, p.age, p.gender 
            FROM waiting_list wl
            JOIN patients p ON wl.patient_id = p.id
            WHERE wl.status != 'completed'
            ORDER BY wl.token_number ASC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addToWaitingList = async (req, res) => {
    try {
        const { patient_id } = req.body;

        // Get next token number
        const lastToken = await pool.query('SELECT MAX(token_number) as max_token FROM waiting_list WHERE date(created_at) = CURRENT_DATE');
        const nextToken = (lastToken.rows[0].max_token || 0) + 1;

        const newItem = await pool.query(
            'INSERT INTO waiting_list (patient_id, token_number, status) VALUES ($1, $2, $3) RETURNING *',
            [patient_id, nextToken, 'waiting']
        );

        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'waiting', 'in_consultation', 'completed'

        const updatedItem = await pool.query(
            'UPDATE waiting_list SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (updatedItem.rows.length === 0) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        res.json(updatedItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getWaitingList,
    addToWaitingList,
    updateStatus
};
