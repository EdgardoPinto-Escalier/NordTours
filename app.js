const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server :)', app: 'NordTours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint now');
});

const port = 3000;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});

