const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');


exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
    const tours = await features.query;
    // query.sort().select().skip().limit()

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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: null,
          aveRating: { $avg: '$ratinfsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    res
      .status(200)
      .json({
        status: 'success',
        data: { stats }
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