const express = require('express');
const router = express.Router();

// POST Register a user
router.post('/', (req,res) => {
  res.send('Regiser a user')
})



module.exports = router;