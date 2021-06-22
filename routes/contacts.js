const express = require('express');
const router = express.Router();

// Get all users contacts
router.get('/', (req,res) => {
  res.send('Get users contacts')
});

// Add a contact
router.post('/', (req,res) => {
  res.send('Add contact')
});


// Update a users contact
router.put('/:id', (req,res) => {
  res.send('Update a users contact')
});


// Delete a users contact
router.delete('/:id', (req,res) => {
  res.send('Delete a users contact')
});


module.exports = router;