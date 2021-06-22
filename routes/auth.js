const express = require('express');
const router = express.Router();

// GET Get logged in user
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// POST Login user
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
