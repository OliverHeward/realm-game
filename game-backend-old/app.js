var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var path = require('path');
var cors = require("cors");
const {graphqlHTTP} = require('express-graphql');
const { ApolloServer, gql } = require("apollo-server-express");
var indexRouter = require("./routes/index");

var app = express();
var mongoose = require("mongoose");
const userModel = require("./mongoose/todo");

var schema = require("./graphql/Schema/Schema");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Setup
app.use(cors());

app.use("/", indexRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Mongoose connect to Database
mongoose.connect("mongodb://127.0.0.1:27017/mydb");
var db = mongoose.connection;
db.on("error", () => {
  console.log("---FAILED to connect to mongoose");
});
db.once("open", () => {
  console.log("+++Connected to Mongoose");
});

app.use('/graphql', graphqlHTTP (req => ({
  schema
  //,graphiql:true
 })));

// Post to Users
app.post("/users", (req, res) => {
  // Insert into Users collection
  var userItem = new userModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  userItem.save((err, result) => {
    if (err) {
      console.log("---UserItem save failed " + err);
    }
    console.log("+++UserItem saved successfully " + userItem.first_name);

    // Unsure of this part
    res.redirect("/");
  });
});

// Apollo Server //
const typeDefs = gql`
  type Book {
    title: String,
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
