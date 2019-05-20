const express = require('express')
const cors = require('cors');
const favicon = require('serve-favicon')
const path = require('path')
const exphbs = require( 'express-handlebars')

require('./db/mongoose');


const gifRouter = require('./routers/gif')
const userRouter = require('./routers/user')
const viewsRouter = require('./routers/views')

const port = process.env.PORT

const app = express();


app.use(cors({ 'header': 'content-disposition'}))
app.set('trust proxy', true)
app.use(favicon(path.join(__dirname, '..','public', 'favicon.png')))
app.use(express.static('public'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: require("./views/helpers/handlebars.js").helpers,
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: './src/views/layouts/',
  partialsDir: './src/views/partials/'
});

app.engine( 'hbs', hbs.engine );
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(gifRouter, userRouter, viewsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
