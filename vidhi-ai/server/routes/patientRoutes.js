const router = require('express').Router();
const auth = require('../middleware/auth');
const { getPatients, getPatientById, createPatient } = require('../controllers/patientController');

router.get('/', auth, getPatients);
router.get('/:id', auth, getPatientById);
router.post('/', auth, createPatient);

module.exports = router;
