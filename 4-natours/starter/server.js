const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  // console.log(con.connections);
  console.log('DB connection successful!');
});

// prints development
console.log(app.get('env'));
console.log(process.env.NODE_ENV)
// prints a banch of different variables
// console.log(process.env);


// const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});