const express = require('express');
const { checkID, getAllTours, createTour, getTour, updateTour, deleteTour } = require('../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`TOUR ID IS: ${val}`);
  next();
});

router.param('id', checkID);

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