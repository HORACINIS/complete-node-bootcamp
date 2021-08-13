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
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    // console.log(req.query, queryObj);

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

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(queryObj);

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=10    1-10 page 1,  11-20 page 2
    // query = query.skip(10).limit(10);
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (slip >= numTours) throw new Error('This page does not exist');
    }

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