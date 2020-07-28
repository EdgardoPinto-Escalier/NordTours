const fs = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

  // GET request to get all the tours
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/app-data/tours-basic.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

// Get a tour by its ID
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if(id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

// POST request
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length -1].id +1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/app-data/tours-basic.json`, 
  JSON.stringify(tours), 
  err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
});

// PATCH request
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Successfully>'
    }
  })
})

const port = 3000;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});

