const router = require('express').Router();
const auth = require('../middleware/auth');
const { createVisit, getVisitsByPatient } = require('../controllers/visitController');

router.post('/', auth, createVisit);
router.get('/patient/:id', auth, getVisitsByPatient);

module.exports = router;
