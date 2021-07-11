const express = require('express');
const fs = require('fs');

const app = express();

// This is called middlewear as it stands in between the request and the response
// This is needed to modify the incoming request data
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// const tours = require('./dev-data/data/tours-simple.json');




const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
});


app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res
      .status(201) // 201 means 'created' (as we have created a new resource)
      .json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});