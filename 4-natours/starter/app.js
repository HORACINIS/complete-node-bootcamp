const { create } = require('domain');
const express = require('express');
const fs = require('fs');

const app = express();
// This is called middlewear as it stands in between the request and the response
// This is needed to modify the incoming request data
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
}

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(tour => tour.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res
    .status(200)
    .json({
      status: 'success',
      data: { tour }
    });
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res
      .status(201) // 201 means 'created' (as we have created a new resource)
      .json({
        status: 'success',
        results: newTour.length,
        data: {
          tour: newTour
        }
      });
  });
}

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
}

const deleteTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    return res
      .status(404)
      .json({
        status: 'fail',
        message: 'Invalid ID'
      });
  }
  res
    .status(204)
    .json({
      status: 'success',
      data: null
    });
}

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});