const express = require('express');
const app = express();
// Load router modules
const users = require('./routes/users')
const auth = require('./routes/auth')
const contacts = require('./routes/contacts')


const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({msg: 'Welcome to Contact Book App API'})
});

// Define routes in routes folder
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

