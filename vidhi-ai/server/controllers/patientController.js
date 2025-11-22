const pool = require('../db');

const getPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createPatient = async (req, res) => {
    try {
        const { name, age, gender, contact_info } = req.body;
        const newPatient = await pool.query(
            'INSERT INTO patients (name, age, gender, contact_info) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, age, gender, contact_info]
        );
        res.json(newPatient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getPatients,
    getPatientById,
    createPatient
};
