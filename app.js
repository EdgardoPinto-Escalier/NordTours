const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

///////////////////////////////////
///// GENERAL MIDDLEWARES
///////////////////////////////////
app.use(morgan('dev'));

app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log('Hello from the Middleware');
  next();
});

///////////////////////////////////
///// ROUTE HANDLERS
///////////////////////////////////

// GET request to get all the tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/app-data/tours-basic.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

// GET single tour by ID
const getSingleTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
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
};

// POST request (create tour)
const createTour = (req, res) => {
const newId = tours[tours.length - 1].id + 1;
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
};

// PATCH request (update tour)
const updateTour = (req, res) => {
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
  });
};

// DELETE tour
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
};

// GET all users handler
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not completed yet'
  });
};

// GET a single user handler
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not completed yet'
  });
};

// CREATE user handler
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not completed yet'
  });
};

// UPDATE user handler
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not completed yet'
  });
};

// DELETE user handler
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not completed yet'
  });
};

//////////////////////////////////////////
///// ROUTES
//////////////////////////////////////////

// Application Routes
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getSingleTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

// User Routes
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

///////////////////////////////////////////////
///// START SERVER
///////////////////////////////////////////////

// Port assign
const port = 3000;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});

