const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  // Express-validator
  [
    // name must not be empty
    check('name', 'Please add name').notEmpty(),
    // email must be valid
    check('email', 'Please include valid email').isEmail(),
    // password must be at least 6 characters
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    // check if errors is not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Search for user in DB to check if user already exists
      // Mongoose method .findOne()
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt the plain text password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to DB
      await user.save();

      // Send user id in payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // JSON Web Token .sign()
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
