const pool = require('../db');

const createVisit = async (req, res) => {
    try {
        const { patient_id, doctor_id, complaints, diagnosis, treatment_plan, notes, icd_codes } = req.body;

        // Start transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const newVisit = await client.query(
                'INSERT INTO visits (patient_id, doctor_id, complaints, diagnosis, treatment_plan, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [patient_id, doctor_id, complaints, diagnosis, treatment_plan, notes]
            );

            // Here you would handle ICD codes insertion into a junction table if normalized,
            // or just store them as JSONB in the visits table if schema supports it.
            // For MVP, we assume they are part of 'notes' or handled simply.

            await client.query('COMMIT');
            res.json(newVisit.rows[0]);
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getVisitsByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM visits WHERE patient_id = $1 ORDER BY visit_date DESC', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createVisit,
    getVisitsByPatient
};
