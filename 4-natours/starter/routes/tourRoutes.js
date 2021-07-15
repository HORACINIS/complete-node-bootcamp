const express = require('express');
const fs = require('fs');


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res
    .status(200)
    .json({
      status: 'success',
      requestedAt: req.requestTime,
      ownerFullName: req.myFullName,
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
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;