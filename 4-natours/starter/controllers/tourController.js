// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json(
//       {
//         status: 'fail',
//         message: 'Missing name or price!'
//       });
//   }
//   next();
// }

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res
      .status(200)
      .json({
        status: 'success',
        results: tours.length,
        // ownerFullName: req.myFullName,
        data: {
          tours
        }
      })
  } catch (err) {
    res
      .status(404)
      .json({ status: 'fail', message: err });
  }
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

exports.createTour = async (req, res) => {
  // const newTour = new Tour(req.body)
  // newTour.save().then((doc) => console.log(doc))
  try {
    const newTour = await Tour.create(req.body);
    res
      .status(201)
      .json({
        status: 'success',
        data: { tour: newTour }
      });
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: 'Invalid data sent!'
      });
  }
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