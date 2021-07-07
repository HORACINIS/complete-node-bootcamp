const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate.js');
console.log(slugify('Fresh Avocados', { lower: true }));


// const creatingSomeFiles = () => {
//   console.log('--------------------------------');

//   const textForTheJsFile = `const name = 'Horacinis'`;
//   fs.writeFileSync('./txt/myIndex.js', textForTheJsFile);

//   const readOutJsFile = fs.readFileSync('./txt/myIndex.js', 'utf-8');
//   console.log(readOutJsFile);

//   const htmlText = `
//   <!DOCTYPE html>
//   <html lang="en">

//   <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//   </head>

//   <body>

//   <script src='myIndex.js'></script>
//   </body>

//   </html>
//   `

//   fs.writeFileSync('./txt/index.html', htmlText);
//   const readWhatIsInTheHtmlFile = fs.readFileSync('./txt/index.html', 'utf-8');
//   console.log(readWhatIsInTheHtmlFile);

//   console.log('---------------------------------');
// }
// creatingSomeFiles();


// // ------------------------
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile('./txt/read-this.txt', 'utf-8', (err, data2) => {
//     fs.writeFile('./txt/CALLATE.txt', `DATA_1 : ${data1} and DATA_2 : ${data2}`, 'utf-8', (err) => {
//       if (err) throw err;
//       console.log('Your file has been saved');
//     })
//   });
// });

// setTimeout(() => console.log(fs.readFileSync('./txt/CALLATE.txt', 'utf-8')), 1)

// -------------------------
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     fs.writeFile('./txt/AHORACTM.txt', `TEXTO AGREGADO ... <--- TEXTO GENERADO\nANTERIORMENTE ---> ${data2}`, 'utf-8', (err) => {
//       if (err) throw err;
//       console.log('TEXT SAVED INTO THE AHORA.txt FILE SUCCESSFULLY');
//     });
//   });
// });




// HTTP STUFF ----------------------------------------------------------------------------------------

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    // console.log('Printing URL');
    // console.log(url);

    // console.log('Printing QUERYSTRING');
    // console.log(querystring);


    // const baseURL = `http://${req.headers.host}`;
    // const requestURL = new URL(req.url, baseURL);

    // const pathname = requestURL.pathname;

    // const query = requestURL.searchParams.get('id');

    res.end(output);

    // About page
  } else if (pathName === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    // res.end('<h2 style="color: blue;">Welcome to my <span style="background-color: yellow;">ABOUT ME</span> page!</h2>');
    res.end(tempProduct);

    // Api page
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {

    // Not found
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'page-not-found'
    });
    res.end('<h2 style="color: red;">Page not found!</h2>');
  }
  console.log(pathName);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server running on port 8000');
});

