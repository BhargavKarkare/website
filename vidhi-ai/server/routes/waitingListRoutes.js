const router = require('express').Router();
const auth = require('../middleware/auth');
const { getWaitingList, addToWaitingList, updateStatus } = require('../controllers/waitingListController');

router.get('/', auth, getWaitingList);
router.post('/', auth, addToWaitingList);
router.put('/:id/status', auth, updateStatus);

module.exports = router;
