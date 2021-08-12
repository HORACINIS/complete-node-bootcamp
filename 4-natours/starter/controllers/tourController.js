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
    // BUILD QUERY 
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    // console.log(req.query, queryObj);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(queryObj);

    // BOTH METHODS BELOW DO THE EXACT SAME THING
    // const query = Tour.find({
    //   duration: '5',
    //   difficulty: 'easy'
    // });

    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)   // ---> here an alternative can be  .lte(5) or .lte(5)
    //   .where('difficulty')
    //   .equals('easy')

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
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

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); // the findById is just a short hand
    // const tour = await Tour.findOne({ _id: req.params.id }) // This works the exact same way
    res
      .status(200)
      .json({
        status: 'success',
        data: {
          tour
        }
      });
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      });
  }
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
        message: err
      });
  }
}

exports.updateTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  try {
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 'fail', message: err })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({
        status: 'success',
        data: null
      });
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      });;
  }
}