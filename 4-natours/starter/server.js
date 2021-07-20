const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');



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