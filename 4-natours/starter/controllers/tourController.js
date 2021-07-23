// const fs = require('fs');
// const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'Missing name or price!'
      });
  }
  next();
}

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res
    .status(200)
    .json({
      status: 'success',
      requestedAt: req.requestTime,
      ownerFullName: req.myFullName,
      // results: tours.length,
      // data: {
      //   tours: tours
      // }
    });
}

exports.getTour = (req, res) => {
  const id = +req.params.id;
  // const tour = tours.find(tour => tour.id === id);
  // res
  //   .status(200)
  //   .json({
  //     status: 'success',
  //     data: { tour }
  //   });
}

exports.createTour = (req, res) => {
  res
    .status(201) // 201 means 'created' (as we have created a new resource)
    .json({
      status: 'success',
      // data: {
      //   tour: newTour
      // }
    });
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
}

exports.deleteTour = (req, res) => {
  // const id = +req.params.id;

  // if (id > tours.length) {
  //   return res
  //     .status(404)
  //     .json({
  //       status: 'fail',
  //       message: 'Invalid ID'
  //     });
  // }
  res
    .status(204)
    .json({
      status: 'success',
      data: null
    });
}