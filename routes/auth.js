const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Bring in middleware function for protected routes
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged user
// @access   Private
// Second parameter (auth) is the middleware function to check and authorize JSON Web Token
router.get('/', auth, async (req, res) => {
  try {
    // If correct token sent, the req object will have user object attached with current user.id - see middleware/auth.js:16
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  // Validation checks
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    // check if errors is not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // If user does not exist send err msg
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // If user exists, compare passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // If user and password correct send JWT
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
