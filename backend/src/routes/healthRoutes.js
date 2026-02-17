const express = require('express');
const { health, ready, live } = require('../controllers/healthController');

const router = express.Router();

router.get('/', health);
router.get('/ready', ready);
router.get('/live', live);

module.exports = router;
