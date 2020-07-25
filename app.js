const fs = require('fs');
const express = require('express');


const app = express();

  // GET request to get all the tours
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/app-data/tours-basic.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
});



const port = 3000;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});

